export const metadataColumns = [
  { name: "library", label: "Library" },
  { name: "organism", label: "Organism" },
  { name: "cultivar", label: "Cultivar" },
  { name: "genotype", label: "Genotype" },
  { name: "tissue", label: "Tissue / Organ" },
  { name: "treatment", label: "Treatment" },
  { name: "inocula", label: "Inocula" },
  {
    name: "timePostTreatment",
    label: "Time post-treatment / inoculation",
  },
  {
    name: "additionalInfo",
    label: "Additional information",
    options: { filter: false, sort: false },
  },
  { name: "reference", label: "Reference" },
  {
    name: "doi",
    label: "DOI",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value && value !== "-" ? (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          "-"
        ),
    },
  },
];
