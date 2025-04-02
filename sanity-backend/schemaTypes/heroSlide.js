export default {
    name: 'heroSlide',
    title: 'Hero Slide',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'A short title or caption for the slide (optional).',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enable hotspot for cropping
        },
        validation: (Rule) => Rule.required(),
        description: 'The image to display in the slider.',
      },
      {
        name: 'altText',
        title: 'Alt Text',
        type: 'string',
        description: 'Alternative text for accessibility (optional, but recommended).',
      },
      {
        name: 'link',
        title: 'Link',
        type: 'url',
        description: 'Optional URL to link the slide to (e.g., a product page).',
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image',
      },
      prepare({ title, media }) {
        return {
          title: title || 'Untitled Slide',
          media,
        };
      },
    },
  };