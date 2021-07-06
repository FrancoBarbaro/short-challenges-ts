function replicate(codingStrand: string) {
  if (codingStrand.toUpperCase() !== codingStrand) {
    codingStrand = codingStrand.toUpperCase();
  }
  let templateStrand = [];
  for (let base of codingStrand) {
    if (base === "A") {
      templateStrand.push("T");
    } else if (base === "T") {
      templateStrand.push("A");
    } else if (base === "C") {
      templateStrand.push("G");
    } else if (base === "G") {
      templateStrand.push("C");
    } else {
      return 'Error: the given strand must only contain bases "A", "T", "G", "C"';
    }
  }
  return templateStrand.join("");
}

function transcribe(templateStrand: string) {
  if (templateStrand.toUpperCase() !== templateStrand) {
    templateStrand = templateStrand.toUpperCase();
  }
  let mRNA = [];
  for (let base of templateStrand) {
    if (base === "A") {
      mRNA.push("U");
    } else if (base === "T") {
      mRNA.push("A");
    } else if (base === "C") {
      mRNA.push("G");
    } else if (base === "G") {
      mRNA.push("C");
    } else {
      return 'Error: the given strand must only contain bases "A", "T", "G", "C"';
    }
  }
  return mRNA.join("");
}

function translate(mRNA: string) {
  if (mRNA.toUpperCase() !== mRNA) {
    mRNA = mRNA.toUpperCase();
  }
  let aminoAcids = [];
  if (mRNA.length % 3 === 2) {
    mRNA = mRNA.slice(0, mRNA.length - 2);
  } else if (mRNA.length % 3 === 1) {
    mRNA = mRNA.slice(0, mRNA.length - 1);
  }
  let codons = mRNA.split(/(.{3})/).filter((x) => x !== "");
  for (let codon of codons) {
    if (
      codon.includes("A") === false &&
      codon.includes("U") === false &&
      codon.includes("G") === false &&
      codon.includes("C") === false
    ) {
      return 'Error: the given strand must only contain bases "A", "U", "G", "C"';
    } else if (codon[0] === "A") {
      if (codon[1] === "A") {
        if (codon[2] === "G" || codon[2] === "A") {
          aminoAcids.push("Lysine");
        } else if (codon[2] === "C" || codon[2] === "U") {
          aminoAcids.push("Asparagine");
        }
      } else if (codon[1] === "U") {
        if (codon[2] === "A" || codon[2] === "C" || codon[2] === "U") {
          aminoAcids.push("Isoleucine");
        } else if (codon[2] === "G") {
          aminoAcids.push("Methionine");
        }
      } else if (codon[1] === "G") {
        if (codon[2] === "G" || codon[2] === "A") {
          aminoAcids.push("Arginine");
        } else if (codon[2] === "C" || codon[2] === "U") {
          aminoAcids.push("Serine");
        }
      } else if (codon[1] === "C") {
        aminoAcids.push("Threonine");
      }
    } else if (codon[0] === "U") {
      if (codon[1] === "A") {
        if (codon[2] === "U" || codon[2] === "C") {
          aminoAcids.push("Tyrosine");
        } else if (codon[2] === "A" || codon[2] === "G") {
          break;
        }
      } else if (codon[1] === "U") {
        if (codon[2] === "U" || codon[2] === "C") {
          aminoAcids.push("Phenylalanine");
        } else if (codon[2] === "A" || codon[2] === "G") {
          aminoAcids.push("Leucine");
        }
      } else if (codon[1] === "G") {
        if (codon[2] === "U" || codon[2] === "C") {
          aminoAcids.push("Cysteine");
        } else if (codon[2] === "G") {
          aminoAcids.push("Tryptophan");
        } else if (codon[2] === "A") {
          break;
        }
      } else if (codon[1] === "C") {
        aminoAcids.push("Serine");
      }
    } else if (codon[0] === "G") {
      if (codon[1] === "A") {
        if (codon[2] === "G" || codon[2] === "A") {
          aminoAcids.push("Glutamic acid");
        } else if (codon[2] === "C" || codon[2] === "U") {
          aminoAcids.push("Aspartic acid");
        }
      } else if (codon[1] === "U") {
        aminoAcids.push("Valine");
      } else if (codon[1] === "G") {
        aminoAcids.push("Glycine");
      } else if (codon[1] === "C") {
        aminoAcids.push("Alanine");
      }
    } else if (codon[0] === "C") {
      if (codon[1] === "A") {
        if (codon[2] === "G" || codon[2] === "A") {
          aminoAcids.push("Glutamine");
        } else if (codon[2] === "C" || codon[2] === "U") {
          aminoAcids.push("Histidine");
        }
      } else if (codon[1] === "U") {
        aminoAcids.push("Leucine");
      } else if (codon[1] === "G") {
        aminoAcids.push("Arginine");
      } else if (codon[1] === "C") {
        aminoAcids.push("Proline");
      }
    }
  }
  return aminoAcids.join(", ");
}

console.clear();
//console.log(transcribe(replicate("ATTCGTATGGCAC")));
//console.log(translate("AGACCUG"));

let codingStrand =
  "ACATTTGCTTCTGACACAACTGTGTTCACTAGCAACCTCAAACAGACACCATGGTGCATCTGACT" +
  "CCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGA" +
  "GGCCCTGGGCAGGCTGCTGGTGGTCTACCCTTGGACCCAGAGGTTCTTTGAGTCCTTTGGGGATC" +
  "TGTCCACTCCTGATGCTGTTATGGGCAACCCTAAGGTGAAGGCTCATGGCAAGAAAGTGCTCGGT" +
  "GCCTTTAGTGATGGCCTGGCTCACCTGGACAACCTCAAGGGCACCTTTGCCACACTGAGTGAGCT" +
  "GCACTGTGACAAGCTGCACGTGGATCCTGAGAACTTCAGGCTCCTGGGCAACGTGCTGGTCTGTG" +
  "TGCTGGCCCATCACTTTGGCAAAGAATTCACCCCACCAGTGCAGGCTGCCTATCAGAAAGTGGTG" +
  "GCTGGTGTGGCTAATGCCCTGGCCCACAAGTATCACTAA";

console.log(replicate(codingStrand));

console.log("");

console.log(transcribe(replicate(codingStrand)));

console.log("");

console.log(translate(transcribe(replicate(codingStrand))));

console.log("\n");
