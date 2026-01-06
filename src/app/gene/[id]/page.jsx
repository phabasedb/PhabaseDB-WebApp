"use client";

// standard
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

// local
import { useGeneById } from "@/integrations/graphql/gene";
import { useSelectedTranscript } from "../hooks/useSelectedTranscript";
import GeneHandler from "./utils/gene-handler";
import Information from "../information";
import Sequences from "../sequences";
import JBrowse from "../jbrowse";
import Expression from "../expression";

export default function GenePage() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id).trim();

  const { data, loading, error } = useGeneById(decodedId);

  return (
    <GeneHandler loading={loading} error={error} data={data}>
      <InnerGenePage data={data} />
    </GeneHandler>
  );
}

function InnerGenePage({ data }) {
  const router = useRouter();

  const { gene, organism, chromosome, transcripts } = data;

  const { selectedTranscript, selectedTranscriptId, setSelectedTranscriptId } =
    useSelectedTranscript(transcripts);

  // refs
  const sequencesRef = useRef(null);
  const jbrowseRef = useRef(null);
  const expressionRef = useRef(null);

  // handler for refs
  const handleNavClick = (key) => {
    const mapRef = {
      "SEQUENCES-NV": sequencesRef,
      "JBROWSER-NV": jbrowseRef,
      "EXPRESSION-NV": expressionRef,
    };
    mapRef[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // handler for BLAST
  const handleBlastClick = () => {
    if (gene?.accessionId && gene?.sequence) {
      sessionStorage.setItem(
        "blastPrefill",
        JSON.stringify({
          accession: gene.accessionId,
          sequence: gene.sequence,
        })
      );
      router.push("/blast");
    }
  };

  return (
    <>
      <Information
        gene={gene}
        organism={organism}
        chromosome={chromosome}
        transcripts={transcripts}
        selectedTranscriptId={selectedTranscriptId}
        onSelectTranscript={setSelectedTranscriptId}
        onNavClick={handleNavClick}
        onBlastClick={handleBlastClick}
        showExpression={organism.id === "PDBJAMAPAORG000001"}
      />

      <section ref={sequencesRef} id="sequences-section">
        <Sequences
          gene={gene}
          chromosome={chromosome}
          selectedTranscript={selectedTranscript}
        />
      </section>

      <section ref={jbrowseRef} id="jbrowse-section">
        <JBrowse gene={gene} organism={organism} chromosome={chromosome} />
      </section>

      {organism.id === "PDBJAMAPAORG000001" && (
        <section ref={expressionRef} id="expression-section">
          <Expression gene={gene} organism={organism} />
        </section>
      )}
    </>
  );
}
