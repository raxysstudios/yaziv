# Yaziv Project Instructions

## Project Overview
Yaziv is a text conversion tool for Caucasian and regional languages, supporting conversion between different writing systems (Cyrillic, Latin variants, IPA, etc.). Built with Nuxt 3 and TypeScript.

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

### Components
- **Slots over props**: Prefer flexibility (actions slots vs fixed buttons)
- **Auto-imports**: Leverage Nuxt auto-imports for components and composables
- **TypeScript**: Always use proper typing, especially for language data

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