# Yaziv

Text converter between different writing systems and transliteration schemes. Data for **9 Caucasian languages** is currently provided: Abaza, Abkhaz, Aghul, Georgian, Kumyk, Kaitag, Lezgi, Ossetian, and Tsakhur. [Contributions welcome](#-contributing-languages)!

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Test your conversions live at [yaziv.raxys.app/editor](https://yaziv.raxys.app/editor)

## 🔄 How Conversion Works

Uses a **hub-and-spoke model**: All conversions go through a central script.

**Example**: For Abaza, Cyrillic serves as the central script
- Conversion path: `Latin → Cyrillic → IPA`
- Choose the most complete/unambiguous script as central

## 🤝 Contributing Languages

Contributions of new languages and writing systems are welcome! Here's how to add support:

### File Structure
```
app/data/langs/[lang-id]/
├── config.json          # Language configuration
└── mappings/
    ├── script1.json     # Writing system mappings
    └── script2.json

public/flags/[iso-code].png  # Optional PNG flag
```

### Configuration (`config.json`)
```jsonc
{
  "iso": "xyz",
  "sample": "Sample text in the language",
  "defaultPair": ["script1", "script2"],
  "mappings": ["script1", "script2", "ipa"]
}
```

### Mapping File (`mappings/[script].json`)
Each mapping file defines a writing system with bilingual names:

```jsonc
{
  "id": "lat",
  "name": { "en": "Latin", "ru": "Латиница" },
  "constraint": "from",    // Optional: "from", "to", or omit
  "rtl": false,            // Optional: true for right-to-left
  "lowercase": false,      // Optional: apply lowercase first
  "pairs": [
    ["sch", "щ"],          // Longest patterns first!
    ["ch", "ч"],           // Critical: Order by length
    ["sh", "ш"],           // Digraphs before single chars
    ["c", "ц"],            // Single characters last
    ["s", "с"]
  ]
}
```

**Why order matters:**
```jsonc
// ✅ Correct - "sch" matches before "ch"
["sch", "щ"], ["ch", "ч"], ["c", "ц"]

// ❌ Wrong - "c" would match first, breaking "ch" and "sch"
["c", "ц"], ["ch", "ч"], ["sch", "щ"]
```

### Language Registry
Add your language to `/app/data/langs.json`:
```jsonc
{
  "id": "xyz",
  "name": { "en": "Language Name", "ru": "Название языка" }
}
```

### Common Script IDs
- `cyr` - Cyrillic
- `lat` - Latin
- `lat_[variant]` - Latin variants (e.g., `lat_chirikba`)
- `ipa` - International Phonetic Alphabet
- `translit_[standard]` - Transliteration schemes

### Testing Your Mappings
Before submitting, test your conversions using the **live editor** at [yaziv.raxys.app/editor](https://yaziv.raxys.app/editor):
- Import your JSON mappings directly
- Test bidirectional conversion
- Verify pattern precedence works
- Check edge cases

## 📜 License

MIT License - feel free to use and modify!
