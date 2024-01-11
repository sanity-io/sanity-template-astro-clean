---

---
## Nota bene

The arrangement here for components added to PortableTextg borrows from the uncompleted note in [the original package]().

It looks overly complex, as there's no reason to build Astro components here. 

So as time permits, this area should be simplified to normal TypeScript components, as that's what ends up being the content anyway, of Astro used for this purpose. 

Then it will also better follow Sanity documentation around portable text.

### In particular, portableText/image.astro

This is a focal point for replacement, probably
- it doesn't need to be .astro, and would be better as .ts
- it's imcomplete from original project comments
- it tries to concentrate on dotting i's in TypeScript, but forgets its own lack of a Parameter type
### Considering about images embedded in Portable Text

If you do this, how do you plan on formatting the images?

And for that matter, what about need to request the proper size, shape, etc. from Sanity's image pipeline?

What will come next is likely consideration about how text should flow in the vicinity of included images.

Thus this area will take some careful thought, perhaps highlighting whether it would be better to handle images in the page design, and not include them in PT....

Probably this is not territory for an introductory scaffold, so some very simple methods are used here, just to keep things reasonable.

They're commented with *todos*
