# Special Solutions Components

This directory contains components for the Special Solutions (Specialløsninger) page, implemented as a data-driven pattern.

## Components Overview

- `solutions.data.ts`: The central data model that defines all solution sections.
- `NumberedCards.astro`: Reusable component for the numbered card columns.
- `SolutionSection.astro`: Main component for each solution section, handling alternating layout.
- `SpecialHero.astro`: Hero section for the top of the page.

## Usage

1. To add a new solution section, just add a new object to the `SOLUTIONS` array in `solutions.data.ts`.
2. The solutions automatically alternate their layout (left/right) based on their index.
3. Solutions support both image and video media types.

## Placeholder Media

The current implementation uses placeholder paths for images and videos. When ready to use actual media:

1. Import actual image files as Astro ImageMetadata objects.
2. Update the Media type in `solutions.data.ts` to use `src: ImageMetadata` for image type.
3. Replace placeholder strings with the imported image references.

## Future Improvements

- Add rich text support for solution descriptions
- Add more card style options
- Add animation effects for scrolling 