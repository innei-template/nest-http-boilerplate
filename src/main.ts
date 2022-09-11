#!env node
// register global

async function main() {
  const { register } = await import('./global/index.global.js')
  await register()
  const [{ bootstrap }] = await Promise.all([import('./bootstrap.js')])
  bootstrap()
}

main()
