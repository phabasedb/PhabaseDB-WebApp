# JBrowse2 Dataset Configuration (datasets.json)

This document describes the structure and purpose of the dataset configuration file
used by the JBrowse2 Genome Browser.

The configuration is consumed by the Genome Browser and Genome Browser (Gene) pages
to initialize genome assemblies, tracks, and default sessions in a declarative manner.
Its primary goal is to centralize genome-related configuration and avoid hardcoded
logic within the frontend application.

---

## Purpose

This file acts as a registry of supported organisms and genome assemblies available
in the JBrowse2 interface. Each entry defines the minimum information required to
initialize a genome browser session, including the assembly, enabled tracks, and
default genomic view.

The configuration is intended to be environment-agnostic and reusable across
different JBrowse2 entry points within the application.

---

## Dataset Definition

Each dataset entry represents a single genome assembly and includes:

- A unique internal identifier
- A human-readable organism and genome version name
- An assembly identifier registered in JBrowse2
- A list of tracks enabled by default
- A predefined default JBrowse2 session

---

## Field Description

### Identifier

Each dataset is identified by a unique `id` value. This identifier is used internally
by the application to reference and resolve a specific genome configuration.

---

### Organism

The `organism` field provides a descriptive name for the organism and genome version.
It is intended for display purposes in the user interface and should be human-readable.

---

### Assembly

The `assembly` field defines the assembly identifier as configured in JBrowse2.
This value must exactly match the assembly name registered in the JBrowse2 backend.

---

### Tracks

The `tracks` field specifies the list of track identifiers that are enabled by default
when the genome browser is initialized. All track identifiers must exist in the
JBrowse2 track configuration.

---

### Default Session

The `sessionDefault` field defines the default JBrowse2 session loaded when a dataset
is selected. This allows the application to consistently initialize the genome browser
with a predefined view, genomic region, and set of active tracks.

The session configuration follows the native JBrowse2 session structure and may be
extended in the future to support additional view types or session options.

---

### Views

The `views` field within the default session defines the initial genome browser views
to be created. Each view specifies the view type, associated assembly, initial genomic
location, and the tracks that should be loaded at initialization.

---

## Design Considerations

- The configuration is declarative and contains no application logic.
- All assemblies and tracks must be pre-registered in JBrowse2.
- The structure is designed to be extensible to support additional genomes, tracks,
  or view types without requiring changes to frontend code.
- Modifications to default genomic locations or visible tracks should be handled
  exclusively through this configuration file.

---

## Maintenance Notes

This file should be updated whenever a new genome assembly or track is added to
JBrowse2. Care should be taken to ensure consistency between the configuration and
the underlying JBrowse2 setup to prevent runtime errors.
