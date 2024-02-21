---

---
## Portable Text Extensions

In this project, using `astro-portabletext`, extensions are written in Astro components only (Name.astro)

Their form is usually very simple.
### basis form

Let's use a blockquote as an example, though we wouldn't actually do thatm as `blockquote` along with many other standard items is included already.

PTBlockQuote.astro:
```astro
---
const { node } = Astro.props
---
<blockquote>{node}</blockquote>

```

And this will be included in PTExtended by adding it to PTExtended.astro:

```astro
---
import PTBlockQuote from "./PTBlockQuote.astro"

   ...

const extraPtComponents = {
  type: {
    image: PTImage,
    blockquote: PTBlockQuote,
    // any other .astro extensions
  }
}
---
   ...
   
```

The `blockquote:` typename comes from the Studio schema definition for the Portable Text block array.