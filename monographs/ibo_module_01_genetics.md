# Module 1 — Genetics and Molecular Biology
### IBO Biology Platform

---

## 1.1 The Physical Structure of DNA

### The Information Problem

Before examining the mechanism of heredity, we must confront its logical requirement. A cell must store information sufficient to specify the construction of all its proteins, regulatory circuits, and structural components — and it must copy that information with extreme fidelity every time it divides. What physical system can accomplish this?

The answer is the DNA double helix. The key insight is not that DNA exists, but that its chemical structure directly embodies the solution to three problems simultaneously: stable information storage, high-fidelity copying, and regulated readout.

### Chemical Structure

DNA is a polymer of four deoxyribonucleotide monomers: adenine (A), thymine (T), guanine (G), and cytosine (C). Each nucleotide consists of a nitrogenous base, a deoxyribose sugar, and a phosphate group. The phosphodiester backbone connects the 3′ hydroxyl of one sugar to the 5′ phosphate of the next, creating a directional chain. This directionality — the distinction between the 5′ end (free phosphate) and the 3′ end (free hydroxyl) — has profound mechanistic consequences.

The two strands of the double helix run antiparallel, meaning one strand reads 5′→3′ while the complementary strand reads 3′→5′. They are held together by hydrogen bonds between complementary bases: A pairs with T (two hydrogen bonds), and G pairs with C (three hydrogen bonds). Watson and Crick's key conceptual contribution in 1953 was recognizing that the two strands are complementary and antiparallel — meaning each strand is a complete template for reconstructing the other.

### Thermodynamics of Base Pairing and Stacking

The stability of the double helix does not arise primarily from hydrogen bonds. Hydrogen bonds between bases are also possible when bases are exposed to water — water itself forms hydrogen bonds with the bases. The thermodynamic driving force for helix stability is instead **base stacking**: the planar aromatic rings of consecutive bases stack on top of each other, creating London dispersion (van der Waals) interactions and partially burying the hydrophobic ring surfaces away from water.

The stability of a short duplex DNA depends on its GC content. A sequence with more G–C pairs is more stable, because G-C pairs form three hydrogen bonds versus two for A-T. Furthermore, G and C are among the strongest stacking partners. The melting temperature $T_m$ of a DNA duplex scales approximately as:

$$T_m \approx 81.5 + 16.6 \log_{10}[Na^+] + 0.41(\%GC) - \frac{675}{n}$$

where $[Na^+]$ is the salt concentration (molarity), $\%GC$ is the percentage of G+C bases, and $n$ is the length of the duplex. This is purely empirical, but it captures the physical facts: GC-rich sequences melt at higher temperatures, and longer sequences are more stable.

### Information Content of DNA

The four nucleotides function as a four-letter alphabet. In information theory, the amount of information in a message drawn from an alphabet of $k$ equally probable symbols is $\log_2(k)$ bits per symbol. With $k = 4$ nucleotides and equal frequencies (which is approximately true in many genomes), each base position carries:

$$I = \log_2(4) = 2 \text{ bits per base}$$

The human genome is approximately $3.2 \times 10^9$ base pairs long. Its total theoretical information content is:

$$I_{total} = 2 \times 3.2 \times 10^9 = 6.4 \times 10^9 \text{ bits} \approx 800 \text{ MB}$$

The *E. coli* genome at $4.6 \times 10^6$ bp encodes approximately $1.15 \times 10^7$ bits — enough information to specify all ~4,300 proteins. The information density of DNA is extraordinary: roughly $10^{21}$ bits per cubic centimeter, exceeding the storage density of any current silicon memory technology by many orders of magnitude.

---

## 1.2 DNA Replication: Machinery and Fidelity

### The Replication Fork

![DNA Replication Fork Machinery](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/dna_replication_fork_1786906792977.jpg)

DNA replication begins at defined sequences called origins of replication (*oriC* in *E. coli*). The DnaA protein recognizes *oriC*, recruits helicase (DnaB), and unwinds the double helix. This creates the replication fork — a Y-shaped structure where two new strands are synthesized simultaneously on each template.

The major protein components at the fork are:

- **DnaB helicase**: A hexameric ring encircling one strand. Uses ATP hydrolysis to translocate 5′→3′ along the lagging strand template, unwinding the helix at ~1000 bp/s.
- **SSBs (Single-Strand Binding Proteins)**: Coat the exposed single-stranded templates, preventing re-annealing and protecting from nucleases. They also reduce secondary structure formation that would impede polymerase movement.
- **Primase (DnaG)**: Synthesizes short RNA primers (~10 nt) de novo, providing the 3′-OH that DNA polymerase requires to begin synthesis.
- **DNA Polymerase III Holoenzyme**: The main replicative polymerase. It consists of the catalytic core (α, ε, θ subunits), the processivity clamp (β clamp, a ring-shaped dimer), and the clamp loader (γ complex). Pol III synthesizes DNA at ~1000 nt/s with a processivity of >500,000 nt per binding event.
- **DNA Polymerase I**: Removes RNA primers using its 5′→3′ exonuclease activity and fills the resulting gap with DNA.
- **DNA Ligase**: Seals the nick between adjacent Okazaki fragments using NAD+ (bacteria) or ATP (eukaryotes) as a cofactor.

### The Fundamental Directionality Problem

All known DNA polymerases synthesize exclusively in the 5′→3′ direction, adding nucleotides to a free 3′-OH group. Since the two template strands are antiparallel, only one strand (the leading strand) can be synthesized continuously in the direction of fork movement. The other strand (the lagging strand) must be synthesized in discontinuous segments called Okazaki fragments, each 1,000–2,000 nt in bacteria and 100–200 nt in eukaryotes. Each Okazaki fragment requires a new RNA primer, synthesis by Pol III, removal of the primer by Pol I, and ligation. This asymmetry in replication is a direct physical consequence of chemical directionality.

### Replication Fidelity: Three Tiers of Error Correction

The spontaneous error rate of base pairing in solution is approximately $10^{-1}$ to $10^{-2}$ per base (tautomeric shifts allow incorrect bases to pair transiently). The biological error rate after all correction mechanisms is ~$10^{-9}$ to $10^{-10}$ per base. This twelve-order-of-magnitude improvement arises from three successive, largely independent mechanisms.

**Tier 1 — Intrinsic Selectivity of Pol III (~$10^{-5}$)**

The active site of DNA polymerase III selects the correct dNTP by an induced-fit mechanism. When the correct nucleotide binds, the fingers domain of the polymerase closes around the nascent base pair, creating a tight binding pocket. This conformational change is the kinetic checkpoint. An incorrect (mismatched) nucleotide prevents full closure of the fingers domain, leaving the 3′-OH and the $\alpha$-phosphate of the incoming nucleotide misaligned. The rate of phosphodiester bond formation drops by a factor of $10^4$ to $10^5$. The intrinsic error rate after this selection step is approximately $10^{-5}$ per base.

**Tier 2 — 3′→5′ Proofreading Exonuclease (~10⁻² reduction)**

The ε subunit of Pol III has a 3′→5′ exonuclease activity. After each nucleotide addition, there is a kinetic competition: the polymerase can either continue extending the chain (fast for a correctly matched 3′ end) or transfer the terminus to the exonuclease active site for removal. A mismatched 3′ end is a poor substrate for extension — the mismatch distorts the geometry of the active site, slowing extension by a factor of ~$10^3$. This preferentially shifts a mismatched end to the exonuclease site, which cleaves it and allows the polymerase to re-insert the correct nucleotide. Proofreading reduces the error rate by a further factor of approximately $10^2$, bringing the post-proofreading error rate to $\sim 10^{-7}$.

**Tier 3 — Methyl-Directed Mismatch Repair (MMR) (~10⁻² reduction)**

![DNA Mismatch Repair System](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/dna_mismatch_repair_1786906827550.jpg)

After replication, any remaining mismatches are recognized by the MutS protein (a dimer), which slides along the DNA until it detects a structural distortion caused by a mismatch. MutS then recruits MutL, which in turn activates MutH. MutH is an endonuclease that specifically nicks the unmethylated strand at hemimethylated GATC sequences. The key insight is **strand discrimination**: immediately after replication, the parental strand is methylated at adenine within GATC sequences by the Dam methylase, while the newly synthesized daughter strand is not yet methylated. MutH uses this asymmetric methylation to identify which strand contains the error. After MutH nicks the daughter strand, the helicase UvrD unwinds the strand from the nick toward the mismatch, and exonucleases degrade the error-containing segment. Pol III then resynthesizes the correct sequence.

MMR reduces the error rate by a further factor of ~$10^2$, yielding the final genomic error rate of approximately $10^{-9}$ per base per replication.

**Summary of Error Rates:**

| Mechanism | Error rate | Reduction factor |
|---|---|---|
| Uncorrected base pairing | ~$10^{-1}$ | — |
| Pol III intrinsic selectivity | ~$10^{-5}$ | $10^4$ |
| 3′→5′ Proofreading | ~$10^{-7}$ | $10^2$ |
| Mismatch Repair | ~$10^{-9}$ to $10^{-10}$ | $10^2$ |

---

## 1.3 Transcription: From DNA to RNA

### The Bacterial RNA Polymerase and Promoter Recognition

![Transcription Initiation in Bacteria](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/transcription_initiation_1786906804692.jpg)

In bacteria, a single RNA polymerase (RNAP) is responsible for all transcription. The core enzyme ($\alpha_2\beta\beta'\omega$) has the catalytic machinery for RNA synthesis, but cannot recognize promoters on its own. Promoter recognition requires the sigma ($\sigma$) factor. The most common *E. coli* sigma factor is $\sigma^{70}$, which directs RNAP to housekeeping genes.

Sigma factor contacts two conserved promoter elements on the nontemplate strand:
- **–35 element**: Consensus sequence TTGACA. The $\sigma$ domain $\sigma_4$ binds here.
- **–10 element**: Consensus sequence TATAAT. The $\sigma$ domain $\sigma_2$ binds here. The AT-rich sequence of the –10 element is thermodynamically important: A-T base pairs have lower melting energy (2 H-bonds vs. 3 for G-C), facilitating the local strand separation needed for open complex formation.
- **Spacer**: The distance between –35 and –10 is critical. The optimal spacer length is 17 ± 1 bp. Deviations from 17 bp reduce promoter strength because the two $\sigma$ domains must be in the correct spatial geometry to simultaneously contact the DNA.

The strength of a promoter is determined primarily by how closely its –35 and –10 sequences match the consensus. A perfect consensus promoter has the highest affinity for $\sigma^{70}$-RNAP holoenzyme and produces the highest rate of transcript initiation.

### The Kinetics of Transcription Initiation

Transcription initiation is a multistep process, not a single binding event:

$$R + P \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} RP_c \underset{k_{-2}}{\overset{k_2}{\rightleftharpoons}} RP_o \xrightarrow{k_3} RP_{init} \rightarrow \ldots$$

Where:
- $RP_c$ is the **closed complex**: RNAP holoenzyme bound to the promoter, with DNA still double-stranded.
- $RP_o$ is the **open complex**: DNA is locally melted from approximately –11 to +3 (the transcription bubble), exposing the template strand for reading. The open complex is highly stable; dissociation is very slow.
- $RP_{init}$ is the **initial transcribing complex**: RNAP has synthesized a few nucleotides but remains at the promoter (promoter escape is rate-limiting for many genes).

The rate-limiting step for most promoters is the isomerization from $RP_c$ to $RP_o$. This step has a large, negative $\Delta G$ (driven by the base-stacking stabilization of the bubble) but a large activation energy (requires partial melting of ~14 bp of DNA). At physiological temperatures (~37°C), this isomerization takes on the order of 1–10 seconds.

### Transcription Elongation and Termination

Once RNAP escapes the promoter, it synthesizes RNA at ~50 nt/s, reading the template strand 3′→5′ and producing RNA 5′→3′. RNAP does not use a primer; it synthesizes the first phosphodiester bond from two NTPs.

Termination occurs by two mechanisms in bacteria:
- **Intrinsic (Rho-independent) termination**: The 3′ end of the transcript forms a stem-loop structure (the terminator hairpin, typically a GC-rich stem followed by a U-rich run). The stem-loop in the nascent RNA causes RNAP to pause, and the weak rU-dA hybrid duplex in the RNA-DNA hybrid then spontaneously dissociates.
- **Rho-dependent termination**: The Rho factor (a hexameric helicase) loads onto the 5′ end of nascent RNA and translocates 5′→3′. When RNAP pauses, Rho catches up, uses ATP hydrolysis to unwind the RNA-DNA hybrid, and releases the transcript.

---

## 1.4 Translation: Decoding the Transcript

### The Ribosome and the Genetic Code

The ribosome is a ribonucleoprotein machine that decodes mRNA and catalyzes peptide bond formation. The bacterial ribosome (70S) consists of the large subunit (50S: 23S rRNA, 5S rRNA, ~31 proteins) and the small subunit (30S: 16S rRNA, ~21 proteins). The small subunit decodes the mRNA; the large subunit catalyzes peptide bond formation. The peptidyl transferase center — the active site for peptide bond formation — is made entirely of RNA, which establishes the ribosome as a ribozyme.

The ribosome contains three tRNA binding sites: the **A site** (aminoacyl-tRNA binds), the **P site** (peptidyl-tRNA, the growing chain), and the **E site** (exit, where deacylated tRNA leaves). Translation proceeds by a cycle: aminoacyl-tRNA delivery → peptide bond formation → translocation.

The genetic code assigns one of 20 amino acids to each of 64 possible codons. The logic of the code is:
- **Degeneracy (redundancy)**: Multiple codons specify the same amino acid. For example, Leucine is encoded by 6 codons (UUA, UUG, CUU, CUC, CUA, CUG). Three codons (UAA, UAG, UGA) specify stop signals.
- **Wobble**: The anticodon of a tRNA pairs with codons at positions 1 and 2 strictly, but position 3 (the wobble position) allows non-Watson-Crick pairing. This allows one tRNA to recognize multiple synonymous codons differing at position 3.
- **Near-universality**: The genetic code is identical in nearly all organisms. This universality implies that the code was fixed very early in evolution, after which any change would be catastrophic (a single codon reassignment would alter the identity of thousands of proteins).

### The Cost of Protein Synthesis

Translation is energetically expensive. Incorporating each amino acid into a growing polypeptide costs:
1. Amino acid activation: formation of aminoacyl-tRNA consumes 1 ATP → AMP + 2P$_i$ (equivalent to 2 ATP in terms of high-energy bonds)
2. Peptide bond formation: no additional ATP required (the energy comes from the aminoacyl-tRNA bond)
3. EF-Tu-mediated delivery: 1 GTP → GDP + P$_i$
4. Translocation: 1 GTP → GDP + P$_i$ (EF-G)

Total cost: ~4 ATP equivalents per peptide bond. For a typical bacterial protein of 300 amino acids, the energetic cost is ~1,200 ATP molecules per protein. Given that *E. coli* synthesizes roughly $10^4$ ribosomes per generation under fast growth, the ribosomal machinery alone consumes a substantial fraction of the cell's ATP budget.

---

## 1.5 Gene Regulation: The Thermodynamics of the Lac Operon

### The lac Operon Architecture

![Lac Operon Regulation](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/lac_operon_regulation_1786906815973.jpg)

The *lac* operon is the paradigmatic example of transcriptional regulation. It encodes three genes:
- **lacZ**: β-galactosidase, cleaves lactose into glucose and galactose (and converts a fraction to allolactose)
- **lacY**: Lactose permease, an active transporter that imports lactose into the cell
- **lacA**: Thiogalactoside transacetylase (minor metabolic role)

These three genes are controlled by a single promoter (P$_{lac}$) and are transcribed together as a polycistronic mRNA. Regulation is imposed by two signals:
1. **Lactose availability**: detected via allolactose (the true inducer, converted from lactose by β-galactosidase)
2. **Glucose availability**: detected via cAMP levels, which activate the Catabolite Activator Protein (CAP)

### Quantitative Repressor Binding

The lac repressor is a tetramer that binds the primary operator O1 (and secondary operators O2/O3) with extraordinary specificity. We analyze the binding thermodynamics.

The binding equilibrium for repressor (R) to operator (O) is:

$$R + O \underset{K_d}{\rightleftharpoons} RO$$

Where $K_d$ is the dissociation constant. The fraction of time the operator is occupied (fractional occupancy $\theta$) is given by:

$$\theta = \frac{[R]}{[R] + K_d}$$

This follows directly from equilibrium: at equilibrium, $K_d = [R][O]/[RO]$. If we define total operator concentration $[O]_{total} = [O] + [RO]$, then $\theta = [RO]/[O]_{total} = [R]/([R] + K_d)$.

For the lac repressor:
- $K_d^{operator} \approx 10^{-13}$ M (with operator)
- Typical intracellular repressor concentration: ~10 nM = $10^{-8}$ M

$$\theta = \frac{10^{-8}}{10^{-8} + 10^{-13}} \approx \frac{10^{-8}}{10^{-8}} = 0.9999990$$

The operator is occupied >99.999% of the time. The promoter is almost completely repressed.

Now, the inducer allolactose (or IPTG) binds the repressor and reduces its affinity for DNA by a factor of ~$10^4$ (Kd shifts from $10^{-13}$ M to $\sim 10^{-9}$ M):

$$\theta_{induced} = \frac{10^{-8}}{10^{-8} + 10^{-9}} = \frac{10}{10 + 1} \approx 0.91$$

The operator is now occupied only 91% of the time. The gene is partially induced, though not fully derepressed. Full induction requires that the repressor concentration falls below $K_d^{induced}$, which occurs at the physiological repressor concentration of ~10 nM ≈ $K_d^{induced}$.

### Catabolite Repression and CAP

When glucose is absent, intracellular cAMP levels rise. cAMP binds the Catabolite Activator Protein (CAP, also called CRP), inducing a conformational change that enables CAP-cAMP to bind the CAP site upstream of P$_{lac}$ with high affinity. Bound CAP-cAMP makes direct contact with the C-terminal domain of the α subunit of RNAP ($\alpha$CTD), stabilizing RNAP at the promoter and increasing the rate of open complex formation by ~20-fold.

The logic of this dual control is elegant. The lac operon is only fully expressed when:
1. Glucose is absent (cAMP is high → CAP-cAMP activates transcription)
2. Lactose is present (allolactose is produced → repressor is inactivated)

This ensures the cell uses glucose (the preferred carbon source) before inducing the enzymes to metabolize lactose. The combination of negative regulation (repressor) and positive regulation (CAP) creates a logical AND gate: high transcription requires [glucose absent] AND [lactose present].

### Cooperative Binding and the Hill Equation

Many transcription factors bind DNA cooperatively — multiple subunits binding to adjacent sites, with the binding of one subunit facilitating binding of subsequent subunits. This is mathematically captured by the Hill equation:

$$\theta = \frac{[L]^n}{[L]^n + K_d^n}$$

where $n$ is the **Hill coefficient** (1 for non-cooperative binding, >1 for positive cooperativity). The biological function of cooperativity is to sharpen the response. The steepness of the switch (how rapidly $\theta$ changes near $K_d$) increases with $n$. For $n = 1$ (Michaelis-Menten), the response is gradual. For $n = 4$ (like hemoglobin), the response is switch-like.

For the lac repressor tetramer binding to multiple operators: the effective Hill coefficient is approximately 2, reflecting the cooperative looping of DNA between O1 and O2/O3. This cooperativity sharpens the repressor's response to allolactose, creating a more switch-like induction behavior.

---

## 1.6 Mutation and DNA Repair

Types of mutations include:
- **Point mutations**: Base substitutions. **Transitions** (purine ↔ purine, or pyrimidine ↔ pyrimidine) are more frequent because the geometry of the mispair is more similar to a Watson-Crick pair. **Transversions** (purine ↔ pyrimidine) are less frequent.
- **Insertions/deletions (indels)**: Can cause frameshift mutations if not in multiples of 3. A frameshift shifts the reading frame, changing all downstream codons.
- **Silent mutations**: Change a codon without changing the encoded amino acid (due to degeneracy).
- **Missense mutations**: Change the amino acid.
- **Nonsense mutations**: Create a premature stop codon.

The consequences of a mutation depend on the encoded amino acid change, the position in the protein (active site vs. surface), and the chemical properties of the substituted residue. Most mutations in coding sequences are deleterious. A smaller fraction are silent. A very small fraction are beneficial.

DNA is also damaged by exogenous agents (UV, ionizing radiation, chemical mutagens) and endogenous processes (reactive oxygen species from metabolism, spontaneous hydrolysis of glycosidic bonds creating abasic sites, deamination of cytosine to uracil). Organisms have evolved multiple repair pathways, including:
- **Base Excision Repair (BER)**: Removes chemically modified single bases (e.g., deaminated or oxidized bases).
- **Nucleotide Excision Repair (NER)**: Removes bulky lesions (e.g., UV-induced thymine dimers, cisplatin adducts) by excising a ~12–25 nt segment around the damage.
- **Mismatch Repair (MMR)**: As described in section 1.2.
- **Double-Strand Break Repair**: Via homologous recombination (high fidelity, uses sister chromatid as template) or Non-Homologous End Joining (error-prone).

---

# Problem Set: Module 1

**Notation**: ★ = accessible; ★★ = requires careful reasoning; ★★★ = challenging derivation or integration; ★★★★ = IBO gold / researcher level.

Each problem is tagged with its primary disciplines.

---

## Problem 1 ★★ [Replication Fidelity × Quantitative]

A DNA polymerase has an intrinsic error rate of $\varepsilon_1 = 10^{-5}$ per base incorporated. The 3′→5′ proofreading exonuclease reduces this by a factor of $f_1 = 10^2$. Subsequent mismatch repair (MMR) reduces it by a further factor of $f_2 = 10^2$.

**(a)** Calculate the final per-base error rate $\varepsilon_{final}$.

**(b)** The *E. coli* genome is $G = 4.6 \times 10^6$ bp. What is the expected number of mutations $\mu$ per complete genome replication event?

**(c)** *E. coli* divides once every $T = 20$ minutes under optimal conditions. How many mutations accumulate in a single lineage over one year ($t = 1$ year)?

**(d)** If a single mutation in a drug-resistance gene can confer survival against an antibiotic, and there are $N_c = 10^{10}$ cells in a culture, calculate the expected number of cells in the culture that carry a pre-existing resistance mutation at a specific single nucleotide position. Does your answer help explain the rapid emergence of antibiotic resistance?

---

### Solution to Problem 1

**(a)** The correction mechanisms are multiplicative (independent):

$$\varepsilon_{final} = \varepsilon_1 \times \frac{1}{f_1} \times \frac{1}{f_2} = 10^{-5} \times 10^{-2} \times 10^{-2} = 10^{-9} \text{ per base}$$

**(b)** For a haploid genome of length $G$:

$$\mu = \varepsilon_{final} \times G = 10^{-9} \times 4.6 \times 10^6 = 4.6 \times 10^{-3} \text{ mutations per replication}$$

This is less than 1 mutation per replication event on average. Roughly 1 in every 217 replication events introduces a mutation somewhere in the genome.

**(c)** Number of divisions per year:

$$n_{div} = \frac{t}{T} = \frac{365 \text{ days} \times 24 \text{ h/day} \times 60 \text{ min/h}}{20 \text{ min}} = \frac{525{,}600}{20} = 26{,}280 \text{ divisions/year}$$

Mutations per year in a single lineage:

$$\mu_{year} = \mu \times n_{div} = 4.6 \times 10^{-3} \times 26{,}280 \approx 121 \text{ mutations/year}$$

A lineage accumulates approximately 121 point mutations per year. Note: this is for a single lineage. In a large population with many cells, many independent mutations arise simultaneously.

**(d)** The expected number of cells with a pre-existing mutation at a specific position:

$$E[cells] = N_c \times \varepsilon_{final} = 10^{10} \times 10^{-9} = 10 \text{ cells}$$

Yes — even before an antibiotic is applied, a culture of $10^{10}$ cells is expected to contain ~10 pre-existing mutants at any given single nucleotide position. Applying the antibiotic does not create resistance; it selects for cells that already carry the resistance mutation. This explains the near-instantaneous appearance of resistant colonies when antibiotic concentrations are insufficient to sterilize the culture.

---

## Problem 2 ★★★ [Gene Regulation × Thermodynamics]

The *lac* repressor binds its primary operator O1 with dissociation constant $K_d^{rep} = 10^{-13}$ M. The intracellular repressor concentration is $[R] = 10 \text{ nM} = 10^{-8}$ M.

**(a)** Derive the fractional occupancy equation $\theta = [R]/([R] + K_d)$ from first principles using equilibrium thermodynamics. State all assumptions.

**(b)** Calculate $\theta$ for the repressed state. Express your answer to five significant figures.

**(c)** Addition of $1 \text{ mM}$ IPTG causes allosteric conformational change in the repressor that reduces its DNA-binding affinity by a factor of $10^4$. Calculate the new $K_d^{induced}$ and the new fractional occupancy $\theta_{induced}$.

**(d)** The rate of transcript initiation $k_{init}$ is proportional to the fraction of time the promoter is unoccupied by repressor: $k_{init} \propto (1 - \theta)$. Calculate the fold-induction (the ratio of $k_{init}$ in the induced state to the repressed state).

**(e)** In a real experiment, the measured fold-induction of the *lac* operon by IPTG is approximately 1,000-fold. Is this consistent with your calculation in (d)? Discuss any discrepancies.

---

### Solution to Problem 2

**(a)** Write the binding equilibrium:

$$R + O \rightleftharpoons RO$$

The dissociation constant is defined from the equilibrium condition ($\Delta G = 0$):

$$K_d = \frac{[R]_{eq}[O]_{eq}}{[RO]_{eq}}$$

This is the standard law of mass action applied to a 1:1 binding reaction. Assumptions: (i) equilibrium thermodynamics applies (the binding and dissociation rates are fast relative to the timescale of interest), (ii) [R] >> [O], so repressor concentration is not significantly depleted by binding (valid because the single operator molecule at $\sim$1 copy/cell is negligible relative to the ~10 repressor tetramers at $10^{-8}$ M in $\sim$1 fL cell volume).

Define total operator $[O]_T = [O] + [RO]$. Fractional occupancy:

$$\theta = \frac{[RO]}{[O]_T} = \frac{[RO]}{[O] + [RO]}$$

From $K_d$: $[O] = K_d[RO]/[R]$. Substituting:

$$\theta = \frac{[RO]}{K_d[RO]/[R] + [RO]} = \frac{1}{K_d/[R] + 1} = \frac{[R]}{[R] + K_d}$$

**(b)** Repressed state:

$$\theta = \frac{10^{-8}}{10^{-8} + 10^{-13}} = \frac{10^{-8}}{10^{-8}(1 + 10^{-5})} = \frac{1}{1 + 10^{-5}} \approx 1 - 10^{-5} = 0.99999$$

The operator is occupied 99.999% of the time.

**(c)** The new dissociation constant: $K_d^{induced} = 10^4 \times K_d^{rep} = 10^4 \times 10^{-13} = 10^{-9}$ M.

$$\theta_{induced} = \frac{10^{-8}}{10^{-8} + 10^{-9}} = \frac{10^{-8}}{1.1 \times 10^{-8}} = \frac{10}{11} \approx 0.909$$

The operator is occupied only ~91% of the time when induced.

**(d)** Rate of initiation is proportional to unoccupied promoter fraction:

$$\text{Fold-induction} = \frac{1 - \theta_{induced}}{1 - \theta_{repressed}} = \frac{1 - 0.909}{1 - 0.99999} = \frac{0.091}{10^{-5}} = 9{,}100$$

**(e)** Our calculation predicts ~9,100-fold induction. The experimental value is ~1,000-fold. These are within an order of magnitude and are consistent in direction. The discrepancy arises because: (i) at full induction, there are still some residual repressor molecules that occasionally bind without IPTG; (ii) the 1 mM IPTG does not saturate all repressor molecules equally (some repressor may not be fully induced); (iii) other regulatory elements (including CAP-cAMP activation and promoter intrinsic activity) impose their own limits on maximum expression; (iv) our $K_d$ values are in vitro measurements that may not perfectly reflect in vivo conditions.

---

## Problem 3 ★★★ [Translation Kinetics × ODE Modeling]

An mRNA is transcribed at a constant rate, achieving a steady-state mRNA concentration of $[M]_0 = 10$ mRNA molecules per cell. Each mRNA degrades with a first-order rate constant $\delta_M = \ln(2) / 2 \text{ min}^{-1}$ (half-life of 2 minutes). Each mRNA is translated at a rate of $k_{trans} = 10$ ribosomes/min, each producing one protein. Completed proteins are diluted by cell division (division time $T_d = 30$ minutes), with negligible intrinsic protein degradation.

**(a)** Write a differential equation for the protein copy number $P(t)$, assuming mRNA concentration is at steady state.

**(b)** Find the steady-state protein copy number $P_{ss}$.

**(c)** If protein synthesis is suddenly halted (e.g., by adding chloramphenicol at $t = 0$) and mRNA degrades according to $[M](t) = [M]_0 e^{-\delta_M t}$, write and solve the ODE for $P(t)$ starting from $P(0) = P_{ss}$.

**(d)** How long does it take for the protein copy number to fall to half of $P_{ss}$? Comment on why this timescale differs from the mRNA half-life.

---

### Solution to Problem 3

**(a)** Protein is produced from mRNA translation and lost by cell division (dilution). The dilution rate constant is $\delta_P = \ln(2)/T_d = \ln(2)/30 \text{ min}^{-1}$.

At steady state, [M] = [M]₀ = 10. Production rate = $k_{trans} \times [M]_0$. Degradation rate = $\delta_P \times P$.

$$\frac{dP}{dt} = k_{trans} [M]_0 - \delta_P P$$

**(b)** At steady state, $dP/dt = 0$:

$$P_{ss} = \frac{k_{trans} [M]_0}{\delta_P} = \frac{10 \times 10}{\ln(2)/30} = \frac{100}{0.0231} \approx 4{,}330 \text{ proteins/cell}$$

**(c)** With chloramphenicol halting translation and mRNA decaying:

$$\frac{dP}{dt} = k_{trans} [M]_0 e^{-\delta_M t} - \delta_P P$$

This is a first-order linear ODE. The integrating factor is $e^{\delta_P t}$:

$$\frac{d}{dt}(P e^{\delta_P t}) = k_{trans} [M]_0 e^{(\delta_P - \delta_M)t}$$

Integrate both sides:

$$P e^{\delta_P t} = \frac{k_{trans}[M]_0}{\delta_P - \delta_M} e^{(\delta_P - \delta_M)t} + C$$

With $\delta_M = \ln(2)/2 \approx 0.347 \text{ min}^{-1}$ and $\delta_P = \ln(2)/30 \approx 0.0231 \text{ min}^{-1}$:

Applying IC $P(0) = P_{ss} = k_{trans}[M]_0/\delta_P$:

$$P(t) = \frac{k_{trans}[M]_0}{\delta_P - \delta_M}\left(e^{-\delta_M t} - e^{-\delta_P t}\right) + P_{ss} e^{-\delta_P t}$$

Since $\delta_M \gg \delta_P$, the mRNA degrades much faster than protein is diluted. After the mRNA is gone ($t \gg 1/\delta_M \approx 3$ min), the equation simplifies to pure protein dilution:

$$P(t) \approx P_{ss} e^{-\delta_P t} \quad \text{for } t \gg 1/\delta_M$$

**(d)** The protein half-life is dominated by dilution (not mRNA decay), so $t_{1/2}^P = \ln(2)/\delta_P = 30$ minutes — the cell division time. This is much longer than the 2-minute mRNA half-life. The protein persists long after its mRNA is gone because it is only lost by dilution at division. This principle — that protein lifetime is often set by cell division, not intrinsic degradation — is fundamental to understanding gene expression dynamics.

---

## Problem 4 ★★★ [Information Theory × Genetic Code]

The genetic code uses triplet codons of four nucleotide bases to encode 20 amino acids + 3 stop codons.

**(a)** Using information theory, calculate the minimum number of bits required to encode 20 amino acids (assuming all amino acids are equally likely).

**(b)** A triplet codon using a 4-letter alphabet can specify $4^3 = 64$ distinct codons. Calculate the information content per codon in bits. How much redundancy (excess bits) does this represent over the minimum?

**(c)** The degeneracy of the code is not random. Synonymous codons (encoding the same amino acid) generally differ only at the third codon position (the "wobble position"). Explain why this pattern reduces the mutational burden on protein function.

**(d)** Given the error rate of translation elongation (~$10^{-4}$ per codon), calculate the probability that a 300-amino acid protein is synthesized with zero errors. What is the probability it contains exactly one error? (Use the Poisson approximation.)

---

### Solution to Problem 4

**(a)** The Shannon information to specify one of 20 equally likely outcomes:

$$I = \log_2(20) = \frac{\ln 20}{\ln 2} = \frac{2.996}{0.693} \approx 4.32 \text{ bits}$$

So a minimum of **5 binary digits** (bits) per amino acid is needed (since $\log_2(20) = 4.32 < 5$).

**(b)** Information per codon (64 possible codons):

$$I_{codon} = \log_2(64) = 6 \text{ bits}$$

Redundancy = $6 - 4.32 = 1.68$ bits per codon. This represents $2^{1.68} \approx 3.2$-fold redundancy in the code, consistent with an average of ~3.2 codons per amino acid (64 codons / 20 amino acids ≈ 3.2, minus 3 stop codons gives ~3.05 per amino acid).

**(c)** If synonymous codons differ at position 3 only, then a point mutation at the wobble position has a high probability of remaining synonymous (encoding the same amino acid). This is because the third position is "buffered" — changes there are more likely to be silent. In contrast, mutations at positions 1 and 2 almost always change the amino acid. The wobble degeneracy therefore concentrates the mutational robustness at the position where mutations most often occur by wobble base-pairing misreads. This is thought to be a selected property of the code, reducing the mean fitness cost of translation errors.

**(d)** Let $p = 10^{-4}$ per codon be the error rate, and $n = 300$ codons. The expected number of errors per protein:

$$\lambda = n \times p = 300 \times 10^{-4} = 0.03 \text{ errors per protein}$$

Using Poisson distribution with $\lambda = 0.03$:

$$P(k \text{ errors}) = \frac{\lambda^k e^{-\lambda}}{k!}$$

$$P(0 \text{ errors}) = e^{-0.03} \approx 0.9704$$

$$P(1 \text{ error}) = 0.03 \times e^{-0.03} \approx 0.0291$$

~97% of 300-amino acid proteins are synthesized with zero errors. ~3% contain one error, and a tiny fraction contain two or more. This shows that for typical proteins, translational fidelity is adequate for most molecules to be correctly made, though quality-control systems (chaperones, proteasomes) handle the misfolded fraction.

---

## Problem 5 ★★★ [Transcription Regulation × Quantitative]

Consider a bacterial gene with a promoter whose affinity for σ70-RNAP holoenzyme is characterized by a dissociation constant $K_d^{RNAP} = 10^{-8}$ M. The cellular concentration of free holoenzyme is $[H] = 50 \text{ nM} = 5 \times 10^{-8}$ M.

**(a)** Calculate the fraction of time this promoter has RNAP bound (fractional occupancy), assuming simple 1:1 binding.

**(b)** A transcriptional activator protein (like CAP-cAMP) binds an upstream site and makes a protein-protein contact with RNAP, stabilizing RNAP at the promoter by $\Delta\Delta G = -3.0 \text{ kcal/mol}$ at $T = 310 \text{ K}$. Calculate the new effective $K_d^{activated}$ for RNAP at this promoter. (Use $R = 1.987 \text{ cal/(mol·K)}$.)

**(c)** A transcriptional repressor binds the operator and sterically blocks RNAP. The repressor has $K_d^{rep} = 5 \times 10^{-10}$ M and its intracellular concentration is $[Rp] = 100 \text{ nM}$. Assuming the repressor and RNAP compete for the promoter region (mutually exclusive binding), write an expression for the probability that RNAP is bound (the probability of transcription initiation), and calculate it numerically.

---

### Solution to Problem 5

**(a)** Standard fractional occupancy:

$$\theta = \frac{[H]}{[H] + K_d} = \frac{5 \times 10^{-8}}{5 \times 10^{-8} + 10^{-8}} = \frac{5}{6} \approx 0.833$$

The promoter is occupied by RNAP 83.3% of the time.

**(b)** The relation between free energy change and equilibrium constant:

$$\Delta G = -RT \ln K_a = RT \ln K_d$$

A favorable protein-protein interaction $\Delta\Delta G = -3.0 \text{ kcal/mol}$ changes $K_d$ by:

$$\frac{K_d^{activated}}{K_d^{basal}} = e^{\Delta\Delta G / RT}$$

$$RT = 1.987 \text{ cal/(mol·K)} \times 310 \text{ K} = 616 \text{ cal/mol} = 0.616 \text{ kcal/mol}$$

$$\frac{K_d^{activated}}{K_d^{basal}} = e^{-3.0/0.616} = e^{-4.87} \approx 7.7 \times 10^{-3}$$

$$K_d^{activated} = 10^{-8} \times 7.7 \times 10^{-3} \approx 7.7 \times 10^{-11} \text{ M}$$

The activator reduces $K_d$ from 10 nM to ~0.077 nM, substantially increasing RNAP occupancy.

**(c)** With competing repressor, the probability of RNAP binding requires weighting against repressor occupancy. Both ligands compete for the same site. Using a partition function approach:

Three possible states: empty promoter (weight 1), RNAP bound (weight $[H]/K_d^{RNAP}$), repressor bound (weight $[Rp]/K_d^{rep}$).

$$P_{RNAP} = \frac{[H]/K_d^{RNAP}}{1 + [H]/K_d^{RNAP} + [Rp]/K_d^{rep}}$$

$$[H]/K_d^{RNAP} = \frac{5 \times 10^{-8}}{10^{-8}} = 5$$

$$[Rp]/K_d^{rep} = \frac{10^{-7}}{5 \times 10^{-10}} = 200$$

$$P_{RNAP} = \frac{5}{1 + 5 + 200} = \frac{5}{206} \approx 0.024$$

RNAP is bound to the promoter only ~2.4% of the time when the repressor is present. Repressor binding is so much more favorable ($[Rp]/K_d^{rep} = 200$) that it effectively dominates the equilibrium.

---

## Problem 6 ★★★★ [Replication × Population Genetics × Mutation]

The Drake rule is an empirical observation that the spontaneous mutation rate per genome per replication is approximately constant across DNA-based microorganisms: $\mu \approx 0.003$ mutations per genome per replication. For a given organism:

**(a)** Given $\mu = 0.003$ and a genome size of $G = 4.6 \times 10^6$ bp (*E. coli*), calculate the implied per-base error rate. Is this consistent with the three-tier correction model?

**(b)** For an RNA virus (like poliovirus, $G_{RNA} = 7.4 \times 10^3$ nt), the RNA-dependent RNA polymerase (RdRp) has no proofreading and an intrinsic error rate of $\sim 10^{-4}$ per nt. Calculate the expected number of mutations per genome replication. Does this violate the Drake rule?

**(c)** Explain why RNA viruses might operate at error rates close to the error threshold. Define the error threshold mathematically in terms of genome length $L$, mutation rate $\mu$, and relative fitness of mutant genomes $w_{mut}$. What happens to a viral population when it crosses the error threshold?

**(d)** A proposed antiviral strategy is "lethal mutagenesis" — using mutagens to push the virus above its error threshold. Ribavirin is a mutagen that approximately doubles the RdRp error rate. Calculate whether a 2-fold increase in error rate is sufficient to reduce poliovirus fitness below the error threshold, given that average fitness of a random mutation is $w_{mut} \approx 0.1$.

---

### Solution to Problem 6

**(a)** Per-base error rate from Drake rule:

$$\varepsilon = \frac{\mu}{G} = \frac{0.003}{4.6 \times 10^6} \approx 6.5 \times 10^{-10} \text{ per base}$$

This is consistent with the three-tier model yielding $\sim 10^{-9}$ to $10^{-10}$ per base. The Drake rule thus reflects the thermodynamic and kinetic limits of DNA polymerase proofreading.

**(b)** Poliovirus RdRp mutations:

$$\mu_{poliovirus} = \varepsilon_{RdRp} \times G_{RNA} = 10^{-4} \times 7.4 \times 10^3 \approx 0.74 \text{ mutations per genome replication}$$

This is ~250-fold higher than the Drake rule value of 0.003. RNA viruses dramatically violate the Drake rule. They tolerate much higher per-genome error rates because they have short genomes (minimizing absolute mutation load) and large population sizes (maintaining fitness despite individual genome degradation through population-level selection).

**(c)** The error threshold. Consider a genome of length $L$ being replicated with per-nucleotide error rate $\mu$. The probability that a full genome is copied without error is:

$$Q = (1 - \mu)^L \approx e^{-\mu L}$$

For fitness to be maintained, the replication of the parental (WT) sequence must produce enough error-free copies to compensate for the fitness cost of mutations. The Eigen error threshold condition requires:

$$Q \cdot w_{WT} > w_{mut} \cdot (1 - Q)$$

For maximum replication fitness $w_{WT} = 1$ and average mutant fitness $w_{mut}$, the threshold is approximately:

$$Q^* = w_{mut}$$
$$e^{-\mu^* L} = w_{mut} \implies \mu^* = -\frac{\ln w_{mut}}{L}$$

Above $\mu^*$, the population can no longer maintain a localized fitness peak in sequence space ("quasispecies") — it undergoes error catastrophe, drifting into a neutral mutant swarm that loses information about the original functional sequence. Fitness collapses.

**(d)** The poliovirus operates at:

$$\mu_{current} = 10^{-4} \text{ per nt}, \quad L = 7.4 \times 10^3 \text{ nt}$$
$$\mu^* = -\frac{\ln(0.1)}{7.4 \times 10^3} = \frac{2.303}{7.4 \times 10^3} \approx 3.11 \times 10^{-4} \text{ per nt}$$

Current error rate: $10^{-4}$ per nt.
Error threshold: $3.11 \times 10^{-4}$ per nt.
After ribavirin (2-fold increase): $2 \times 10^{-4}$ per nt.

$2 \times 10^{-4} < 3.11 \times 10^{-4}$. A 2-fold increase is **insufficient** to cross the error threshold. Experimentally, ribavirin shows only moderate antiviral efficacy against poliovirus when used alone, consistent with this calculation. To cross the threshold, a ~3-fold or greater increase in error rate would be required. This illustrates why lethal mutagenesis as a strategy requires either very potent mutagens or combinations with other antivirals.

---

## Problem 7 ★★★ [DNA Structure × Thermodynamics]

A 20-bp DNA duplex has the sequence:

```
5'—ATGCATGCATGCATGCATGC—3'
3'—TACGTACGTACGTACGTACG—5'
```

This sequence has exactly 10 A-T pairs and 10 G-C pairs (50% GC).

**(a)** Using the nearest-neighbor thermodynamic model (simplified), the enthalpy contribution of each A-T nearest-neighbor pair is approximately $-7 \text{ kJ/mol}$ and each G-C nearest-neighbor pair is approximately $-10 \text{ kJ/mol}$ per pair. Treating this as alternating pairs and ignoring end effects, estimate the total hybridization enthalpy $\Delta H$ of the 20-bp duplex.

**(b)** The melting temperature formula for a short duplex in 100 mM NaCl is given by:

$$T_m = \frac{\Delta H}{\Delta S + R \ln(C_T/4)}$$

where $C_T$ is the total strand concentration and $\Delta S \approx \Delta H / 354 \text{ K}$ (empirical approximation). For $C_T = 1 \mu\text{M} = 10^{-6}$ M, calculate $T_m$.

**(c)** If the GC content is increased to 100% (all G-C pairs) with the same duplex length, estimate how much $T_m$ would change. What biological consequences might a GC-rich promoter have for transcription?

---

### Solution to Problem 7

**(a)** The alternating ATGC sequence creates repeating nearest-neighbor pairs. In a 20-bp duplex there are 19 nearest-neighbor steps. With alternating AT/GC, approximately half (9-10 steps) are AT-type and half are GC-type. Simplified:

$$\Delta H \approx 10 \times (-7) + 9 \times (-10) = -70 + (-90) = -160 \text{ kJ/mol}$$

(More precise calculation requires exact nearest-neighbor lookup tables for each dinucleotide step, but this order-of-magnitude estimate is acceptable for this problem.)

**(b)** $\Delta S = \Delta H / 354 = -160{,}000 / 354 = -452 \text{ J/(mol·K)}$.

$R \ln(C_T/4) = 8.314 \times \ln(10^{-6}/4) = 8.314 \times \ln(2.5 \times 10^{-7}) = 8.314 \times (-15.20) = -126.4 \text{ J/(mol·K)}$

$$T_m = \frac{-160{,}000}{-452 + (-126.4)} = \frac{-160{,}000}{-578.4} \approx 277 \text{ K} = 4^\circ\text{C}$$

This is low for a 20-mer; real 20-mers with 50% GC typically melt at 55–60°C, suggesting the simplified per-step energies used here are underestimates of the full enthalpy. The calculation illustrates the method, but accurate $T_m$ prediction requires the full nearest-neighbor parameters from SantaLucia 1998.

**(c)** For 100% GC content:

$$\Delta H_{GC} \approx 19 \times (-10) = -190 \text{ kJ/mol}$$

$\Delta S_{GC} = -190{,}000/354 = -537 \text{ J/(mol·K)}$

$$T_m^{GC} = \frac{-190{,}000}{-537 + (-126.4)} \approx \frac{-190{,}000}{-663.4} \approx 286 \text{ K}$$

The change in $T_m$ from this simplified model: $286 - 277 = +9 \text{ K}$. Real increases are larger (~4°C per 10% GC increase).

For transcription: GC-rich promoters are harder to melt. The –10 element of bacterial promoters is AT-rich (consensus TATAAT) precisely because RNAP must locally melt the DNA to form the open complex. A GC-rich –10 element would have a higher activation energy for this melting step, reducing promoter strength and transcription initiation rate. This is a direct physical constraint: the evolution of AT-rich promoter elements is thermodynamically enforced.

---

## Problem 8 ★★★★ [Molecular Evolution × Information Theory × Mutation]

**(a)** The neutral theory of molecular evolution (Kimura, 1968) states that most fixed mutations are neutral — they have neither positive nor negative fitness effects. The rate of neutral substitution in a population is equal to the per-genome neutral mutation rate $\mu_n$, independent of population size $N$. Explain this counterintuitive result using the basic equations of population genetics: the probability of fixation of a neutral allele is $p_{fix} = 1/N$, and the rate of new neutral mutations per generation in a population of $N$ diploid individuals is $2N\mu_n$. Derive the substitution rate $k$.

**(b)** Molecular clocks: if the neutral substitution rate $k$ is constant over evolutionary time, then the number of sequence differences between two species should be proportional to their divergence time. Two mammalian species share a gene with 90% sequence identity (10% divergence) at synonymous positions. The neutral substitution rate is $\mu_n = 2 \times 10^{-9}$ per site per year. Estimate their divergence time.

**(c)** Why should you specifically use synonymous (silent) substitutions rather than all substitutions to estimate divergence times from molecular clocks? What would happen to your estimate if you mistakenly used all substitutions (synonymous + nonsynonymous)?

---

### Solution to Problem 8

**(a)** In a population of $N$ diploid individuals, each generation produces $2N\mu_n$ new neutral mutations (total across all individuals, both allele copies). Each new neutral mutation has a probability of fixation equal to its initial frequency: $p_{fix} = 1/(2N)$ for a diploid population (it starts as 1 copy among $2N$ total copies). Therefore, the rate of neutral substitutions per generation is:

$$k = 2N\mu_n \times \frac{1}{2N} = \mu_n$$

The population size cancels exactly. The fixation rate of neutral mutations equals the per-genome neutral mutation rate, independent of $N$. This is Kimura's fundamental result. Intuitively: large populations produce more new neutral mutations per generation, but each individual mutation has a smaller probability of reaching fixation. These two effects cancel perfectly.

**(b)** If 10% of synonymous sites have diverged, and the substitution process is approximately Poisson (and reversible), we must correct for multiple hits at the same site (using the Jukes-Cantor correction for nucleotides):

$$d = -\frac{3}{4} \ln\left(1 - \frac{4}{3} p\right)$$

where $p = 0.10$ is the observed proportion of differences:

$$d = -\frac{3}{4} \ln\left(1 - \frac{4 \times 0.10}{3}\right) = -0.75 \ln(1 - 0.133) = -0.75 \ln(0.867) = -0.75 \times (-0.1426) \approx 0.107$$

The corrected divergence is 10.7% (close to raw since divergence is low). The divergence time is:

$$t = \frac{d}{2k} = \frac{0.107}{2 \times 2 \times 10^{-9}} = \frac{0.107}{4 \times 10^{-9}} \approx 2.67 \times 10^7 \text{ years} = 26.7 \text{ million years}$$

The factor of 2 in the denominator accounts for the fact that divergence accumulates on both lineages independently from the time of split.

**(c)** Synonymous (silent) substitutions are used because they are under minimal selection pressure — they do not change the amino acid, so the protein function is unaffected. Therefore, they are approximately neutral and accumulate at the neutral rate $\mu_n$. They serve as a molecular clock.

Nonsynonymous substitutions are under selection pressure. Deleterious mutations are eliminated by purifying selection (reducing their rate below $\mu_n$). Beneficial mutations can sweep through the population rapidly (rate can exceed $\mu_n$ during adaptive episodes). Including nonsynonymous substitutions would introduce rate heterogeneity depending on the functional constraints of the protein, making the clock unreliable. Using all substitutions would generally underestimate divergence time (because purifying selection on nonsynonymous sites suppresses their apparent rate) and could also produce non-linear rates if the proteins were under adaptive evolution during certain periods.

---

## Problem 9 ★★★ [Promoter Kinetics × Transcription]

In *E. coli*, σ70-RNAP holoenzyme binds promoters by a two-step mechanism:

$$H + P \overset{k_{on}}{\underset{k_{off}}{\rightleftharpoons}} RP_c \overset{k_{iso}}{\underset{k_{-iso}}{\rightleftharpoons}} RP_o$$

Where $H$ is free holoenzyme, $P$ is the promoter, $RP_c$ is the closed complex, and $RP_o$ is the open complex (isomerization step). For the *lac* promoter: $k_{on} = 2 \times 10^7 \text{ M}^{-1}\text{s}^{-1}$, $k_{off} = 0.2 \text{ s}^{-1}$, $k_{iso} = 1 \text{ s}^{-1}$, $k_{-iso} = 0.01 \text{ s}^{-1}$, $[H] = 50 \text{ nM}$.

**(a)** Under the assumption that the closed complex is a rapid pre-equilibrium (i.e., binding/unbinding is fast relative to isomerization), derive an expression for the pseudo-first-order rate of open complex formation $k_{obs}$ as a function of $[H]$.

**(b)** Calculate the time constant $\tau = 1/k_{obs}$ for open complex formation at $[H] = 50 \text{ nM}$.

**(c)** At very high $[H]$ ($[H] \gg K_d$), what does $k_{obs}$ approach? What does this mean physically?

---

### Solution to Problem 9

**(a)** Under the pre-equilibrium assumption, the closed complex equilibrium gives:

$$K_d^{closed} = \frac{k_{off}}{k_{on}} = \frac{0.2}{2 \times 10^7} = 10^{-8} \text{ M} = 10 \text{ nM}$$

The fraction of promoters in the closed complex state: $\theta_c = [H]/([H] + K_d^{closed})$.

The observed rate of open complex formation is:

$$k_{obs} = k_{iso} \times \theta_c = \frac{k_{iso}[H]}{[H] + K_d^{closed}}$$

This is a Michaelis-Menten-like expression where $k_{iso}$ is the maximum rate and $K_d^{closed}$ plays the role of $K_m$.

**(b)** At $[H] = 50 \text{ nM} = 5 \times 10^{-8}$ M:

$$k_{obs} = \frac{1 \times 5 \times 10^{-8}}{5 \times 10^{-8} + 10^{-8}} = \frac{5}{6} \approx 0.833 \text{ s}^{-1}$$

$$\tau = \frac{1}{k_{obs}} = \frac{1}{0.833} \approx 1.2 \text{ seconds}$$

Open complex formation takes about 1.2 seconds at these concentrations. This is consistent with the experimentally observed time scale for transcription initiation at the *lac* promoter.

**(c)** As $[H] \gg K_d^{closed}$:

$$k_{obs} \rightarrow k_{iso} = 1 \text{ s}^{-1}$$

At saturating holoenzyme concentrations, the rate is limited entirely by the isomerization step $k_{iso}$ — the chemical/structural change from closed to open complex. This step is independent of holoenzyme concentration because all promoters are already occupied with closed complexes. No amount of additional RNAP can increase the rate beyond $k_{iso}$. This tells us that open complex formation involves an intrinsic conformational change in either the DNA or the polymerase (specifically, DNA strand melting) that is rate-limited by its own activation energy.

---

## Problem 10 ★★★★ [Integrated: Replication × Repair × Cancer Biology]

Lynch syndrome is an inherited form of colorectal cancer caused by germline mutations in mismatch repair (MMR) genes (MLH1, MSH2, MSH6, PMS2). Affected individuals are heterozygous (+/−) for the defective MMR gene and have a ~70–80% lifetime risk of colorectal cancer.

**(a)** In MMR-deficient cells, only two of the three error-correction tiers are functional. Using the error rate values from section 1.2 and Problem 1, calculate the per-base error rate in an MMR-deficient human cell.

**(b)** A key observation is that Lynch syndrome tumors exhibit **microsatellite instability (MSI)**. Microsatellites are short tandem repeat sequences (e.g., CACACACA...). Explain mechanistically why MMR deficiency specifically causes microsatellite instability rather than simply uniformly increasing mutation rates across the genome.

**(c)** For a cell to become cancerous, it typically needs mutations in several specific tumor-suppressor genes or oncogenes. Suppose a minimum of $m = 5$ rate-limiting mutations are required for colorectal cancer, in a tissue with $N_{cells} = 10^{10}$ colonic epithelial cells, dividing approximately $n_{div} = 100$ times over a lifetime. Calculate the probability that at least one cell has accumulated all 5 required mutations by chance alone, for (i) an MMR-proficient cell with $\varepsilon = 10^{-9}$ per base, and (ii) an MMR-deficient cell with $\varepsilon = 10^{-7}$ per base. Assume the 5 mutations occur at specific single base positions and act independently.

---

### Solution to Problem 10

**(a)** MMR-deficient cells lack the third tier. Per-base error rate:

$$\varepsilon_{MMR^-} = \varepsilon_1 \times \frac{1}{f_1} = 10^{-5} \times 10^{-2} = 10^{-7} \text{ per base}$$

This is 100-fold higher than normal ($10^{-9}$). The human genome is $\sim 3 \times 10^9$ bp, so the expected number of mutations per replication:

$$\mu_{human, MMR^-} = 10^{-7} \times 3 \times 10^9 = 300 \text{ mutations per replication}$$

vs. normal:

$$\mu_{human, normal} = 10^{-9} \times 3 \times 10^9 = 3 \text{ mutations per replication}$$

MMR loss increases the genomic mutation rate by ~100-fold.

**(b)** Microsatellites are especially vulnerable to MMR deficiency because of **replication slippage**. During replication of repetitive sequences (e.g., CA repeats), the lagging-strand template can loop out, causing the polymerase to insert or delete one or more repeat units. This slippage creates an insertion/deletion mismatch (an extrahelical loop) rather than a base substitution mismatch. The MMR system, particularly MutS/MSH2-MSH6 (which recognize base mismatches) and MSH2-MSH3 (which recognize larger insertion/deletion loops), is the primary repair system for these slippage errors. Without functional MMR, slippage-derived insertions and deletions at microsatellite sequences are not repaired, leading to length variation — microsatellite instability. This is why MSI is the specific molecular signature of MMR deficiency, rather than a uniform increase in all mutation types.

**(c)** The probability that a given cell acquires a specific mutation at a specific base position in a single replication:

$$p_{mut} = \varepsilon \text{ (per base, per replication)}$$

The probability that a cell has accumulated all $m$ specific mutations after $n_{div}$ divisions:

$$p_{cell} = \left(1 - (1 - p_{mut})^{n_{div}}\right)^m \approx (p_{mut} \times n_{div})^m \quad \text{for } p_{mut} \times n_{div} \ll 1$$

The probability that at least one of $N_{cells}$ cells has all $m$ mutations:

$$P_{cancer} = 1 - (1 - p_{cell})^{N_{cells}} \approx N_{cells} \times p_{cell} \quad \text{for } p_{cell} \ll 1$$

**MMR-proficient** ($\varepsilon = 10^{-9}$):

$$p_{cell} = (10^{-9} \times 100)^5 = (10^{-7})^5 = 10^{-35}$$
$$P_{cancer} = 10^{10} \times 10^{-35} = 10^{-25}$$

Essentially zero probability. Cancer through purely random mutation in an MMR-proficient background would essentially never occur by this simple model.

**MMR-deficient** ($\varepsilon = 10^{-7}$):

$$p_{cell} = (10^{-7} \times 100)^5 = (10^{-5})^5 = 10^{-25}$$
$$P_{cancer} = 10^{10} \times 10^{-25} = 10^{-15}$$

Still very small for this simple model. This illustrates that cancer requires not just elevated mutation rates, but clonal expansion — after the first "driver" mutation, the clone expands to a large number of cells, dramatically increasing the probability of acquiring subsequent mutations. The real cancer risk calculation must account for this multi-stage clonal amplification, which is why Lynch syndrome creates a strongly elevated but not certain lifetime risk. The elevated mutation rate ($100\times$) compresses the time to accumulate all required mutations, but the process remains stochastic and dependent on clonal dynamics.

---

## Python Code Lab: Simulating Gene Expression Dynamics

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

# Parameters
k_trans   = 10.0      # translation rate (proteins/mRNA/min)
delta_M   = np.log(2)/2   # mRNA degradation rate (1/min, half-life=2 min)
delta_P   = np.log(2)/30  # protein dilution rate (1/min, doubling time=30 min)
M_ss      = 10.0      # steady-state mRNA (molecules/cell)

# Part 1: Steady-state protein copy number
P_ss = k_trans * M_ss / delta_P
print(f"Steady-state mRNA:    {M_ss:.0f} molecules/cell")
print(f"Steady-state protein: {P_ss:.0f} molecules/cell")
print(f"mRNA half-life:       {np.log(2)/delta_M:.1f} min")
print(f"Protein half-life:    {np.log(2)/delta_P:.1f} min")

# Part 2: Response to chloramphenicol (translation block at t=0)
def model_chloramphenicol(P, t, k_trans, M0, delta_M, delta_P):
    M = M0 * np.exp(-delta_M * t)  # mRNA decays exponentially
    dP_dt = k_trans * M - delta_P * P
    return dP_dt

t = np.linspace(0, 60, 1000)
P0 = [P_ss]
sol = odeint(model_chloramphenicol, P0, t,
             args=(k_trans, M_ss, delta_M, delta_P))

# Part 3: lac operon induction dynamics
# Repressor unbinds slowly when IPTG is added; model as step change in
# effective transcription rate (before: rate=0.01*k; after: rate=k)
def lac_induction(state, t, k_mRNA, delta_M, k_trans, delta_P, t_induction):
    M, P = state
    # Transcription rate switches at t_induction
    k_tx = k_mRNA if t >= t_induction else 0.01 * k_mRNA
    dM_dt = k_tx - delta_M * M
    dP_dt = k_trans * M - delta_P * P
    return [dM_dt, dP_dt]

k_mRNA = delta_M * M_ss   # transcription rate to maintain M_ss at steady state
t_lac  = np.linspace(0, 120, 2000)
init   = [0.1, 43.0]  # near-zero (repressed) initial state
sol_lac = odeint(lac_induction, init, t_lac,
                 args=(k_mRNA, delta_M, k_trans, delta_P, 30.0))

# Plotting
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Left: chloramphenicol response
axes[0].axhline(P_ss, color='gray', linestyle=':', label=f'P_ss = {P_ss:.0f}')
axes[0].plot(t, sol[:, 0], 'k-', lw=2, label='Protein (chloramphenicol added at t=0)')
axes[0].axvline(x=np.log(2)/delta_P, color='red', linestyle='--',
                label=f'Protein half-life = {np.log(2)/delta_P:.1f} min')
axes[0].set_xlabel('Time (min)', fontsize=12)
axes[0].set_ylabel('Protein molecules per cell', fontsize=12)
axes[0].set_title('Protein decay after translational block', fontsize=12)
axes[0].legend(fontsize=10)
axes[0].grid(True, alpha=0.3)

# Right: lac operon induction
axes[1].axvline(x=30, color='orange', linestyle='--', label='IPTG added (t=30 min)')
axes[1].plot(t_lac, sol_lac[:, 0] * k_trans / delta_P,
             'b-', lw=1.5, label='mRNA (normalized to protein units)')
axes[1].plot(t_lac, sol_lac[:, 1], 'r-', lw=2, label='Protein')
axes[1].set_xlabel('Time (min)', fontsize=12)
axes[1].set_ylabel('Molecules per cell', fontsize=12)
axes[1].set_title('lac operon induction dynamics', fontsize=12)
axes[1].legend(fontsize=10)
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

*End of Module 1 — Genetics and Molecular Biology*

**Next: Module 2 — Cell Biology and Biochemistry**
*(Enzyme kinetics, metabolic flux, ATP synthesis thermodynamics, signal transduction)*
