export default defineEventHandler((event) => {
  const query = getQuery(event)
  const counter = query.counter || 0

  return {
    message: `Server response for counter: ${counter}`,
    counter,
    timestamp: new Date().toISOString(),
    serverData: {
      random: Math.random(),
      environment: 'development',
    },
  }
})
