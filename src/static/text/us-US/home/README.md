# Home Page Content Configuration (home.json)

This document describes the structure and purpose of the JSON content file
used to populate the Home page of the application.

The configuration defines a sequence of visual and descriptive content
elements that introduce the platform, its scientific context, and its
biological focus.

---

## Purpose

The purpose of this configuration is to manage Home page content in a
structured and presentation-agnostic manner. It enables the application
to render introductory and contextual information dynamically while
maintaining a clear separation between content and layout logic.

---

## Content Structure

The JSON file consists of an ordered list of content entries. Each entry
represents a visual section composed of an image and an associated
descriptive text.

The order of elements in the array defines the display sequence on the
Home page.

---

## Content Fields

Each content entry may include:

- An image path used for visual representation
- A descriptive text block providing scientific or contextual information
- An optional list of terms to be emphasized or rendered in italic form

---

## Content Guidelines

- Content should be concise, informative, and suitable for a scientific audience.
- Text must remain descriptive and free of application or presentation logic.
- Image paths should reference static assets managed by the application.
- Emphasis markers should be treated as semantic annotations, not formatting logic.

---

## Localization Requirements

This configuration must be replicated across all supported locales using
the same structure and keys. Only text values should be translated or
localized.

Structural changes must be applied consistently to avoid rendering issues.

---

## Maintenance Notes

When updating content, preserve the order and structure of entries to
maintain visual consistency. New sections or fields should be introduced
with care and reflected across all locale versions.
