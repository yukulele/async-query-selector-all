import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/async-query-selector.ts'],
  outdir: './dist',
  minify: true,
  plugins: [dts()],
})
