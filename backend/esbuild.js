import * as esbuild from 'esbuild';

const isDev = process.argv.includes('--watch');

const config = {
  entryPoints: ['./src/server.ts'], // Your entry point
  bundle: true, // IMPORTANT: Allows imports without extensions, bundles everything into one file
  platform: 'node', // Optimized for Node.js or Deno
  format: 'esm', // Output as ES modules
  target: 'node20', // Your Node version
  outdir: 'dist', // Output directory
  packages: 'external', // node_modules are NOT bundled (standard for backend)
};

if (isDev) {
  let ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('⚡ Watching for changes...');
} else {
  await esbuild.build(config);
  console.log('✅ Build complete');
}
