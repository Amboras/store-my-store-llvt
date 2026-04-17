'use client'

import { Flame } from 'lucide-react'

interface UrgencyBarProps {
  totalInventory: number
}

export default function UrgencyBar({ totalInventory }: UrgencyBarProps) {
  // Determine urgency level
  const isLow = totalInventory > 0 && totalInventory < 80
  const isCritical = totalInventory > 0 && totalInventory < 30

  if (totalInventory <= 0) {
    return (
      <div className="flex items-center gap-2 bg-muted/60 border rounded-sm px-4 py-2.5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sold out — check back soon
        </span>
      </div>
    )
  }

  if (isCritical) {
    return (
      <div className="flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-sm px-4 py-2.5">
        <Flame className="h-3.5 w-3.5 text-accent fill-accent flex-shrink-0" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          Only {totalInventory} units left — selling fast
        </span>
      </div>
    )
  }

  if (isLow) {
    return (
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-sm px-4 py-2.5">
        <Flame className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
          Limited stock — {totalInventory} units remaining
        </span>
      </div>
    )
  }

  // In stock but not urgent — show neutral "in stock" signal
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-sm">
      <span className="inline-block h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
      <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
        In stock — ships within 48 hours
      </span>
    </div>
  )
}
