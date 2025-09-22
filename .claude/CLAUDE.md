# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Yaziv is a text conversion tool for Caucasian and regional languages, supporting conversion between different writing systems (Cyrillic, Latin variants, IPA, etc.). Built with Nuxt 4 and TypeScript.

## Development Commands

### Core Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

### Development Workflow
- **Main development**: Use `npm run dev` for hot reload
- **Before commits**: Run `npm run lint:fix` to fix code style issues
- **Testing changes**: Use the `/editor` page to test conversion mappings
- **Production testing**: Use `npm run build && npm run preview`

## Core Architecture Principles

### Text Conversion System
- **Hub-and-spoke model**: All conversions go through a central script (chosen per language)
- **No direct pairs**: Text flows Source → Central → Target, never Source → Target directly
- **Precedence matters**: Character mapping order is critical (longest patterns first)
- **Case variants**: System handles lowercase, capitalized, and uppercase automatically

### Code Organization
- **Pure functions**: `utils/` for stateless logic (convert algorithm)
- **Reactive logic**: `composables/` for stateful Vue logic (useTextConverter)
- **Component structure**: Folder names become prefixes (App/, Converter/, Home/)

### Key Architecture Files
- **`utils/converter.ts`**: Core conversion algorithm with case variant handling
- **`composables/useTextConverter.ts`**: Reactive converter state management with lazy loading
- **`composables/useUrlSync.ts`**: URL parameter synchronization with global batching to prevent race conditions
- **`utils/types.ts`**: TypeScript definitions for language configurations and mappings
- **`app/data/langs/`**: Language data structure (config.json + mappings/ folder per language)

## Language Data Structure

### Required Files
```
app/data/langs/[lang-id]/
├── config.json          # Language configuration
├── f.png                 # Flag image (optional)
└── mappings/
    ├── [script1].json    # Writing system mappings
    └── [script2].json
```

### Critical Rules
1. **Mapping order**: Always longest patterns first (trigraphs → digraphs → single chars)
2. **Central script**: Choose most phonologically complete script as hub
3. **Bidirectional**: All mappings should work in both directions
4. **No information loss**: Central script must preserve all distinctions

## Vue/Nuxt Coding Standards

### Reactivity
- **Prefer refs**: Use `ref()` over `reactive()` for primitive values
- **Computed properties**: Return computed refs directly, not `.value` wrapped
- **Composables**: Return object with refs/computed, not reactive state
- **URL synchronization**: Use `useUrlSync` composable for linking refs to query parameters

### Components
- **Slots over props**: Prefer flexibility (actions slots vs fixed buttons)
- **Auto-imports**: Leverage Nuxt auto-imports for components and composables
- **TypeScript**: Always use proper typing, especially for language data

### Nuxt-Specific Patterns
- **Data loading**: Use `useAsyncData` with reactive keys for dynamic imports
- **Internationalization**: All user-facing text must have English and Russian translations
- **Static assets**: Language flags in `public/flags/` named by ISO code (e.g., `abq.png`)

### Performance
- **Optimize for patterns**: Algorithm optimized for 1-4 character sequences
- **Precedence matching**: Longest patterns checked first for correct conversion
- **Avoid premature optimization**: Focus on correctness, then performance

## Language Contribution Guidelines

### Data Accuracy
- **Linguistic sources**: Reference academic or official transliteration schemes
- **Test thoroughly**: Use `/editor` page to verify conversion accuracy
- **Edge cases**: Test capitalization, punctuation, complex sequences

### Technical Requirements
- **JSON format**: Strict adherence to mapping file structure
- **Character encoding**: UTF-8 for all special characters
- **Naming conventions**: Use descriptive IDs (`cyr`, `lat`, `ipa`, `lat_variant`)

## Component Patterns

### Converter Components
- **InputArea/OutputArea**: Use slots for custom actions
- **Controls**: Pass methods as props for domain-specific components
- **PairsList**: Accept convert function to avoid coupling

### Error Handling
- **Graceful fallbacks**: Missing flags/data shouldn't break UI
- **Type safety**: Proper optional chaining for language data
- **User feedback**: Clear error states and loading indicators

## File Structure Conventions
- **Self-contained languages**: Everything for a language in its folder
- **No external dependencies**: Flags and data served locally
- **Consistent naming**: `config.json`, `f.png`, predictable mapping IDs

## Testing & Validation
- **Conversion accuracy**: Verify linguistic correctness
- **Bidirectional flow**: Ensure Source→Central→Target works
- **Pattern precedence**: Confirm longer patterns match first
- **Case sensitivity**: Test all capitalization scenarios

## Performance Considerations
- **Short patterns**: Optimized for typical linguistic digraphs/trigraphs
- **Memory efficiency**: Refs over reactive for simple state
- **Computed caching**: Leverage Vue's reactivity system
- **Static assets**: Serve flags and data as static files

## Linguistic Guidelines
- **Central script selection**: Choose script that preserves all phonological distinctions
- **Unambiguous mappings**: Avoid many-to-one mappings when possible
- **Academic accuracy**: Follow established transliteration standards
- **Documentation**: Include sample text and conversion examples

---

When working on Yaziv, prioritize linguistic accuracy, maintain the hub-and-spoke conversion model, and ensure all language data remains self-contained and contributor-friendly.
