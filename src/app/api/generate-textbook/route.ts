import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { subject, objectives, background, priorKnowledge, depth } = await req.json()

    if (!subject || !objectives) {
      return NextResponse.json({ error: 'Subject and objectives are required' }, { status: 400 })
    }

    const bgText = background ? `The student comes from a ${background} background.` : ''

    const depthInstructions: Record<string, string> = {
      concise: 'Write concisely. Cover key concepts clearly. Aim for 3-4 chapters.',
      standard: 'Write with balanced depth. Include explanations, examples, and exercises. Aim for 5-6 chapters.',
      detailed: 'Write in depth. Include thorough explanations, multiple examples, analogies, and exercises. Aim for 6-8 chapters.',
      comprehensive: 'Write a comprehensive reference textbook with detailed explanations, many examples, real-world applications, exercises with solutions, and a glossary. Aim for 8-10 chapters.'
    }

    const prompt = `You are an expert textbook author and educator. Create a complete, high-quality personalized textbook.

SUBJECT: ${subject}
LEARNING OBJECTIVES:
${objectives}
STUDENT BACKGROUND: ${bgText || 'Not specified — write for a general audience.'}
PRIOR KNOWLEDGE LEVEL: ${priorKnowledge}
DEPTH LEVEL: ${depth}

INSTRUCTIONS:
${depthInstructions[depth]}

Make all examples and analogies relevant to the student's background (${background || 'general audience'}).
Adapt complexity to their prior knowledge level: ${priorKnowledge}.

FORMAT your textbook exactly as follows:

TEXTBOOK: [Full Title]
SUBTITLE: [Descriptive subtitle]
AUTHOR: Personalized for ${background || 'the Student'}

---

PREFACE
[2-3 paragraphs explaining what the student will learn]

---

TABLE OF CONTENTS
[List all chapters]

---

CHAPTER [N]: [Chapter Title]

Overview
[1-2 sentence overview]

[Full content with section headers, explanations, and examples]

Key Terms
[3-5 key terms with definitions]

Chapter Summary
[3-5 bullet point takeaways]

Review Questions
[3-5 questions]

---

[Repeat for each chapter]

GLOSSARY
[All key terms alphabetically]

WHAT TO EXPLORE NEXT
[3-5 recommended next steps]

Write the complete textbook now. Be thorough, educational, and engaging.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ content })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 })
  }
}
