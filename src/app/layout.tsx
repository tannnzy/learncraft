import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'LearnCraft — AI Textbook Generator',
  description: 'Generate personalized textbooks from your learning objectives using AI',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
