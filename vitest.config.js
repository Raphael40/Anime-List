import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import jsconfigPaths from 'vite-jsconfig-paths';

export default mergeConfig(
	viteConfig,
	defineConfig({
		plugins: [jsconfigPaths()],
		test: {
			exclude: [...configDefaults.exclude, './tests']
		}
	})
);
