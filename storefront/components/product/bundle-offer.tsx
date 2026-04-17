'use client'

import { useState, useMemo } from 'react'
import { Package, Loader2, Check } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface VariantOption {
  option_id?: string
  option?: { id: string }
  value: string
}

interface BundleVariant {
  id: string
  title: string
  options?: VariantOption[]
  calculated_price?: {
    calculated_amount?: number
    currency_code?: string
  }
}

interface BundleProduct {
  id: string
  title: string
  handle: string
  variants?: BundleVariant[]
  options?: Array<{
    id: string
    title: string
    values?: Array<{ id?: string; value: string } | string>
  }>
}

interface BundleOfferProps {
  bundleProduct: BundleProduct
}

export default function BundleOffer({ bundleProduct }: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    const firstVariant = bundleProduct.variants?.[0]
    if (firstVariant?.options) {
      for (const opt of firstVariant.options) {
        const optionId = opt.option_id || opt.option?.id
        if (optionId && opt.value) defaults[optionId] = opt.value
      }
    }
    return defaults
  })

  const variants = bundleProduct.variants || []
  const options = bundleProduct.options || []

  const selectedVariant = useMemo(() => {
    if (variants.length <= 1) return variants[0]
    return variants.find((v) =>
      v.options?.every((opt) => {
        const optionId = opt.option_id || opt.option?.id
        if (!optionId) return false
        return selectedOptions[optionId] === opt.value
      })
    ) || variants[0]
  }, [variants, selectedOptions])

  const price = selectedVariant?.calculated_price?.calculated_amount
  const currency = selectedVariant?.calculated_price?.currency_code || 'usd'

  const formatPrice = (cents: number | undefined) => {
    if (!cents) return ''
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(cents / 100)
  }

  const handleAddBundle = () => {
    if (!selectedVariant?.id) return
    addItem(
      { variantId: selectedVariant.id, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success('2-Pack added to bag')
          setTimeout(() => setJustAdded(false), 2200)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add bundle')
        },
      }
    )
  }

  return (
    <div className="rounded-sm border-2 border-accent/30 bg-accent/5 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-accent flex-shrink-0" />
          <div>
            <p className="text-sm font-bold uppercase tracking-wide">Bundle &amp; Save $12</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Grab the 2-Pack — same size, pick your color combo
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-base font-extrabold font-heading">{formatPrice(price)}</p>
          <p className="text-xs text-muted-foreground line-through">{formatPrice(7600)}</p>
        </div>
      </div>

      {/* Option selectors */}
      {options.map((option) => {
        const values = (option.values || []).map((v) =>
          typeof v === 'string' ? v : v.value
        ).filter(Boolean) as string[]

        const optionId = option.id
        const selectedValue = selectedOptions[optionId]

        return (
          <div key={optionId}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2">
              {option.title}
              {selectedValue && (
                <span className="ml-2 normal-case tracking-normal font-normal text-muted-foreground">
                  — {selectedValue}
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {values.map((value) => {
                const isSelected = selectedValue === value
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedOptions((prev) => ({ ...prev, [optionId]: value }))}
                    className={`px-3 py-1.5 text-xs border transition-all ${
                      isSelected
                        ? 'border-accent bg-accent text-white'
                        : 'border-border hover:border-accent/50 bg-background'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* CTA */}
      <button
        onClick={handleAddBundle}
        disabled={!selectedVariant?.id || isAddingItem}
        className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-heading font-bold uppercase tracking-widest transition-all ${
          justAdded
            ? 'bg-green-700 text-white'
            : 'bg-accent text-white hover:opacity-90'
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            2-Pack Added to Bag
          </>
        ) : (
          <>
            <Package className="h-4 w-4" />
            Add 2-Pack — Save $12
          </>
        )}
      </button>
    </div>
  )
}
