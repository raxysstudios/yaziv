# Yaziv - Script Conversion Tool

A web application for converting text between different writing systems and transliteration schemes. Built with Nuxt 3 and optimized for Caucasian and regional languages.

## 🌍 Supported Languages

Currently supports **9 languages** with multiple writing systems:
- **Abaza** (abq) - Cyrillic, Latin (Chirikba), IPA, Transliteration
- **Abkhaz** (abk) - Cyrillic, Latin, IPA, Transliteration
- **Aghul** (agx) - Cyrillic, Latin
- **Georgian** (kat) - Georgian scripts, Transcription, IPA
- **Kumyk** (kum) - Cyrillic, Latin, Ajam (Arabic)
- **Kaitag** (xdq) - Cyrillic, Latin, IPA
- **Lezgi** (lez) - Cyrillic, Latin variants
- **Ossetian** (oss) - Cyrillic, Latin, Georgian, IPA
- **Tsakhur** (tkr) - Cyrillic, Latin

## 🤝 Contributing New Languages

We welcome contributions of new languages and writing systems! Here's how to add support for a new language:

### 1. Language Structure

Each language needs files in `/app/data/langs/[language-id]/`:

```
app/data/langs/
├── [lang-id]/
│   ├── config.json          # Language configuration
│   ├── flag.png             # Language flag (optional)
│   └── mappings/
│       ├── script1.json     # Writing system 1
│       ├── script2.json     # Writing system 2
│       └── ...
└── langs.json               # Language registry
```

### 2. Language Configuration (`config.json`)

```json
{
  "iso": "xyz",                           // ISO 639-3 language code
  "sample": "Sample text in the language",
  "defaultPair": ["script1", "script2"],   // Default conversion pair
  "mappings": [                           // Available writing systems
    "script1",
    "script2",
    "ipa"
  ]
}
```

### 3. Mapping Files (`mappings/[script].json`)

Each mapping file defines a writing system:

```json
{
  "id": "latin",
  "name": {
    "en": "Latin",
    "ru": "Латиница"
  },
  "constraint": "from",       // Optional: "from", "to", or omit
  "rtl": false,               // Optional: right-to-left direction
  "lowercase": false,         // Optional: apply lowercase before conversion
  "pairs": [
    ["ä", "а"],               // [from, to] character mappings
    ["ch", "ч"],              // Longer patterns first (digraphs)
    ["c", "ц"],               // Then shorter patterns
    ["a", "а"]
  ]
}
```

### 4. Character Mapping Rules

**Critical:** Order matters! Arrange pairs by length (longest first):

```json
"pairs": [
  // ✅ Correct order (longest first)
  ["sch", "щ"],     // 3 characters
  ["ch", "ч"],      // 2 characters
  ["sh", "ш"],      // 2 characters
  ["s", "с"],       // 1 character
  ["c", "ц"],       // 1 character

  // ❌ Wrong order (would break conversion)
  ["c", "ц"],       // This would match before "ch"
  ["ch", "ч"]       // This would never match
]
```

### 5. Add to Language Registry

Add your language to `/app/data/langs.json`:

```json
[
  {
    "id": "xyz",
    "name": {
      "en": "Language Name",
      "ru": "Название языка"
    }
  }
]
```

### 6. Language Flag (Optional)

Add a flag image as `flag.png` in your language folder:
- **Format**: PNG format recommended
- **Size**: Square aspect ratio (e.g., 64x64, 128x128)
- **Naming**: Must be exactly `flag.png`
- **Auto-detection**: System automatically displays flags when present

### 7. Naming Conventions

Use descriptive IDs for writing systems:
- `cyr` - Cyrillic
- `lat` - Latin
- `lat_[variant]` - Latin variants (e.g., `lat_chirikba`)
- `ipa` - International Phonetic Alphabet
- `translit_[standard]` - Transliteration schemes
- `[script_name]` - Native scripts (e.g., `georgian`)

### 7. Testing Your Contribution

1. Add sample conversions to verify correctness
2. Test edge cases (capitalization, punctuation)
3. Ensure bidirectional conversion works
4. Check that longer patterns take precedence

### 8. Pull Request Guidelines

When submitting:
1. Include language metadata and sample text
2. Reference linguistic sources for mappings
3. Test conversion accuracy
4. Follow existing file structure

## 🚀 Development Setup

Built with Nuxt 4.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Mapping Examples

### Simple Character Mapping
```json
{
  "id": "cyrillic",
  "name": { "en": "Cyrillic", "ru": "Кириллица" },
  "pairs": [
    ["а", "a"], ["б", "b"], ["в", "v"]
  ]
}
```

### Complex Digraphs
```json
{
  "id": "latin",
  "name": { "en": "Latin", "ru": "Латиница" },
  "pairs": [
    ["кьво", "q'w"],    // Complex sequences first
    ["къ'", "q'"],      // Then shorter variants
    ["къ", "q"],        // Single characters last
    ["к", "k"]
  ]
}
```

### Directional Constraints
```json
{
  "id": "ipa",
  "name": { "en": "IPA", "ru": "МФА" },
  "constraint": "to",   // Only usable as conversion target
  "pairs": [
    ["ə", "а"], ["ʃ", "ш"]
  ]
}
```

### Conversion Logic

The system uses a **hub-and-spoke model** for script conversion:

1. **Central Script**: One writing system (chosen by language maintainer) serves as the intermediate "hub"
2. **All mappings** link to this central script, not to each other
3. **Any-to-any conversion**: Text goes `Source → Central → Target`

**Example**: For Abaza language
- **Central script**: Cyrillic (`cyr`)
- **Other scripts**: `lat_chirikba`, `ipa`, `translit_wiki` all map to/from Cyrillic
- **Conversion path**: `Latin → Cyrillic → IPA`

### Choosing a Central Script

When adding a language, choose the central script carefully:
- ✅ **Most complete**: Can represent all sounds/distinctions in the language
- ✅ **Unambiguous**: One-to-one character relationships when possible
- ✅ **Well-established**: Widely used or standardized
- ✅ **No information loss**: Other scripts can be derived from it accurately

**Common choices:**
- **Cyrillic** for Caucasian languages (most phonologically complete)
- **Native script** for languages with traditional writing systems
- **IPA** for purely phonetic applications

## 🧪 Testing Your Mappings

Before submitting, test your character mappings using our **Conversion Editor**:
👉 **[Test at yaziv.raxys.app/editor](https://yaziv.raxys.app/editor)**

The editor allows you to:
- Paste your character pairs directly
- Test conversion in both directions
- Import/export JSON mapping data
- Verify complex patterns work correctly

## 📜 License

MIT License - feel free to use and modify!

---

**Need help?** Open an issue or check existing language files for examples!
