'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Zap, Star, Package } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE   = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=90'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1400&q=90'

const MARQUEE_ITEMS = [
  'NEW DROP', 'GRAPHIC TEES', 'FREE SHIPPING OVER $75', 'LIMITED QUANTITIES',
  'NEW DROP', 'GRAPHIC TEES', 'FREE SHIPPING OVER $75', 'LIMITED QUANTITIES',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubscribed(true)
  }

  return (
    <>
      {/* Marquee ticker */}
      <div className="bg-foreground text-background py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap select-none">
          {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8 text-xs font-heading font-semibold uppercase tracking-[0.25em]">
              {item}
              <span className="inline-block w-1 h-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-background overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-0 items-stretch min-h-[85vh]">
          {/* Text */}
          <div className="flex flex-col justify-center py-16 lg:py-24 pr-0 lg:pr-16 space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-accent font-semibold">
                SS25 Collection — Available Now
              </p>
              <h1 className="font-heading font-extrabold uppercase leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                Wear<br />
                <span className="text-accent">Your</span><br />
                World.
              </h1>
            </div>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Heavyweight graphic tees for those who make a statement before they say a word.
              Limited print runs. No restocks.
            </p>

            {/* Urgency pill */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-2 w-fit">
              <Zap className="h-3.5 w-3.5 fill-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider">Only 47 tees left in this drop</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm font-heading font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Shop the Drop
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-foreground px-8 py-4 text-sm font-heading font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                Our Story
              </Link>
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-6 pt-2 border-t">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">4.9 / 5</span> from 2,400+ customers
              </p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[50vh] lg:min-h-full bg-muted overflow-hidden order-1 lg:order-2">
            <Image
              src={HERO_IMAGE}
              alt="INKDROP SS25 Collection — Blackout Logo Tee"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
              priority
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border px-4 py-3 rounded-sm">
              <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Starting at</p>
              <p className="font-heading font-extrabold text-2xl leading-none">$38</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── PRODUCT SPOTLIGHT ── */}
      <section className="py-section bg-foreground text-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Bestseller</p>
              <h2 className="font-heading font-extrabold uppercase leading-none text-h1">
                Blackout<br />Logo Tee
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                280 GSM ring-spun cotton. Water-based ink that outlasts the trend cycle.
                Three colorways, six sizes. This is the one.
              </p>

              {/* Feature bullets */}
              <ul className="space-y-3">
                {[
                  'Heavyweight 280 GSM — feels like armor, wears like butter',
                  'Water-based ink — zero crack, zero fade',
                  'Relaxed unisex fit — size up for the oversized look',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/products/blackout-logo-tee"
                  className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 text-sm font-heading font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Shop Now — $38
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products/blackout-logo-tee-2-pack"
                  className="inline-flex items-center gap-2 border border-background/30 px-8 py-4 text-sm font-heading font-bold uppercase tracking-widest hover:bg-background/10 transition-colors"
                >
                  Get the 2-Pack — $64
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-muted/20 order-1 lg:order-2">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Blackout Logo Tee on model"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-section-sm border-y">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Truck className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $75</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <RotateCcw className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Shield className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Package className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold">Ships in 48h</p>
                <p className="text-xs text-muted-foreground">Fast fulfilment, tracked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">Drop Alerts</p>
          <h2 className="font-heading font-extrabold uppercase text-h2 leading-none">
            First to<br />the Drop.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            New graphics sell out fast. Get on the list and be the first to know.
          </p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-heading font-bold uppercase tracking-widest">
              <Shield className="h-4 w-4" />
              You&apos;re on the list.
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-b-2 border-foreground/20 bg-transparent px-1 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-6 py-3 text-sm font-heading font-bold uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
