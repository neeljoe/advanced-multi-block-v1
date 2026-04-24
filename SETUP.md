# Advanced Multi-Block Plugin Setup

Documentation for the block plugin used to integrate custom blocks into the theme.

> **Based on:** [Refactoring the Multi-Block Plugin](https://developer.wordpress.org/news/2025/08/refactoring-the-multi-block-plugin-build-smarter-register-cleaner-scale-easier/) by Troy Chaplin (WordPress Developer Blog, August 2025)

---

## Overview

This plugin provides a scalable multi-block architecture for WordPress. It supports three block types (static, dynamic, interactive), uses the WordPress block metadata collection API for efficient registration, and compiles global scripts separately from block assets.

**WordPress minimum:** 6.8 (uses `wp_register_block_types_from_metadata_collection`)

---

## Directory Structure

```
advanced-multi-block/
├── advanced-multi-block.php      # Plugin entry & block registration
├── package.json                 # npm scripts & dependencies
├── webpack.config.js            # Custom Webpack config for global scripts
├── src/
│   ├── blocks/                  # All blocks live here
│   │   ├── slider/             # Static block (example)
│   │   ├── banner/             # Dynamic block (example)
│   │   └── toggle/             # Interactive block (example)
│   ├── editor-script.js        # Global editor-only scripts
│   └── frontend-script.js      # Global frontend scripts
└── build/                      # Compiled output (auto-generated)
    ├── blocks-manifest.php      # Auto-generated block metadata collection
    ├── blocks/                  # Compiled block assets
    ├── editor-script.js         # Compiled editor script
    └── frontend-script.js       # Compiled frontend script
```

---

## Block Types Supported

| Type | How to Create | Render Method |
|------|---------------|---------------|
| **Static** | `create-block` with default template | Client-side (React) |
| **Dynamic** | `create-block --variant dynamic` | Server-side (render.php) |
| **Interactive** | `create-block --template @wordpress/create-block-interactive-template` | Client-side with Interactivity API |

---

## Key Features

### 1. Automatic Block Registration

New blocks are picked up automatically via the `blocks-manifest.php`. No manual registration required.

**To add a new block:**
```bash
cd src/blocks

# Static block
npx @wordpress/create-block@latest my-block --textdomain advanced-multi-block --no-plugin

# Dynamic block
npx @wordpress/create-block@latest my-block --textdomain advanced-multi-block --no-plugin --variant dynamic

# Interactive block
npx @wordpress/create-block@latest my-block --textdomain advanced-multi-block --template @wordpress/create-block-interactive-template --no-plugin
```

### 2. WordPress 6.7+ Block Metadata Collection API

The plugin uses the efficient `wp_register_block_types_from_metadata_collection()` API (WP 6.8+) which registers all blocks in a single call, improving performance.

```php
// advanced-multi-block.php
function register_blocks() {
    $build_dir = __DIR__ . '/build/blocks';
    $manifest  = __DIR__ . '/build/blocks-manifest.php';

    if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
        wp_register_block_types_from_metadata_collection( $build_dir, $manifest );
        return;
    }
    // Fallback for WP 6.7 and earlier...
}
```

### 3. Global Scripts (editor-script.js & frontend-script.js)

Scripts outside individual blocks that need to run globally:

- **editor-script.js** - Loaded only in the block editor (`enqueue_block_editor_assets` hook)
- **frontend-script.js** - Loaded on the frontend (`wp_enqueue_scripts` hook)

**Build output includes matching `.asset.php` files** for automatic dependency management and versioning.

### 4. Custom Webpack Configuration

`webpack.config.js` extends WordPress scripts with separate entry points for global scripts, without interfering with interactive block builds.

---

## Build Commands

```bash
# Development build with hot reload
npm run start

# Production build
npm run build

# Linting
npm run lint:js
npm run lint:css

# Create plugin zip for distribution
npm run plugin-zip
```

> **Note:** Interactive blocks require `--experimental-modules` flag, which is already included in the build commands.

---

## For Theme Integration

### Loading Blocks from Plugin in Theme

To use these blocks in a theme, ensure the plugin is active. The blocks will appear in the Block Inserter under **Widgets**.

### Adding Block Variations or Editor Extensions

Add code to `src/editor-script.js`:

```javascript
import { addFilter } from '@wordpress/hooks';
import { createBlock } from '@wordpress/blocks';

addFilter(
    'blocks.registerBlockType',
    'my-theme/custom-block-variations',
    (settings, name) => {
        if (name === 'create-block/slider') {
            return {
                ...settings,
                variations: [
                    {
                        name: 'featured-slider',
                        title: 'Featured Slider',
                        description: 'A slider with featured posts.',
                        icon: 'slides',
                        attributes: { posts: 5 },
                    },
                ],
            };
        }
        return settings;
    }
);
```

### Adding Frontend Enhancements

Add code to `src/frontend-script.js`:

```javascript
// Global frontend functionality
document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations, lazy loading, etc.
});
```

---

## Enqueue Functions (Implemented)

Shared assets are registered via enqueue functions in `advanced-multi-block.php`:

**Editor Assets** (loaded only in block editor):
```php
function enqueue_block_assets() {
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/editor-script.asset.php';

    wp_enqueue_script(
        'editor-script-js',
        plugin_dir_url( __FILE__ ) . 'build/editor-script.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        false
    );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_block_assets' );
```

**Frontend Assets** (loaded on public pages):
```php
function enqueue_frontend_assets() {
    $asset_file = include plugin_dir_path( __FILE__ ) . 'build/frontend-script.asset.php';

    wp_enqueue_script(
        'frontend-script-js',
        plugin_dir_url( __FILE__ ) . 'build/frontend-script.js',
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_frontend_assets' );
```

These functions load the compiled `editor-script.js` and `frontend-script.js` files (with their `.asset.php` files for dependency management and versioning).

---

## Tips for Team Members

1. **Drop blocks in `src/blocks/`** - They auto-register after build
2. **Keep block-specific scripts inside each block folder** - Only use global scripts for cross-block features
3. **Run `npm run build`** after adding/removing blocks to update the manifest
4. **Test in WordPress 6.8+** for optimal performance (falls back to older APIs)
5. **Interactive blocks need `--experimental-modules`** - Remember this when creating new interactive blocks

---

## Resources

- [Original Article](https://developer.wordpress.org/news/2025/08/refactoring-the-multi-block-plugin-build-smarter-register-cleaner-scale-easier/)
- [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/)