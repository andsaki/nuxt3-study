import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  try {
    const filePath = join(process.cwd(), 'public', 'docs', `${slug}.md`)
    const content = readFileSync(filePath, 'utf-8')

    return content
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Markdown file not found: ${slug}`
    })
  }
})
