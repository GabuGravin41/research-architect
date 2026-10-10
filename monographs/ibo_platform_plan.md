# IBO Biology Platform — Implementation Plan

## Vision

A Codeforces-equivalent for competitive biology. Problems require quantitative reasoning,
cross-topic derivation, and genuine mechanistic understanding. Aimed at IBO gold medalists,
graduate students, and working researchers.

---

## Module Structure (First 4 Modules)

Each module contains:
1. **Deep lecture notes** — manuscript format, derivations from first principles, diagrams
2. **Problem set** — 8–12 problems per module, tiered by difficulty
3. **Full worked solutions** — showing every step, not just the answer

---

## Module 1: Genetics and Molecular Biology

### Topic Arc
DNA structure → Replication (fidelity, proofreading kinetics) → Transcription (promoter
binding, thermodynamics of RNA polymerase) → Translation (reading frame, codon usage) →
Gene regulation (lac operon, thermodynamics of repressor binding) → Mutation and repair

### Sample Problems (preview)

**Problem 1.1 [Quantitative]**
A DNA polymerase has an intrinsic error rate of 10⁻⁵ per base. The exonuclease proofreading
activity reduces this by a factor of 10². Subsequent mismatch repair reduces it by a further
factor of 10³. Calculate the final per-base error rate. If the E. coli genome is 4.6 × 10⁶ bp,
what is the expected number of mutations per replication event? If E. coli divides every 20
minutes, how many mutations accumulate per year in a single lineage?

**Problem 1.2 [Thermodynamics]**
The lac repressor binds its operator with Kd = 10⁻¹³ M. At a typical intracellular repressor
concentration of 10 nM, calculate the fraction of time the operator is occupied. Derive the
relationship between Kd, repressor concentration, and fractional occupancy from equilibrium
thermodynamics. How does adding 1 mM IPTG (which reduces the effective repressor-DNA
affinity by a factor of 10⁴) change this?

**Problem 1.3 [Cross-topic]**
An mRNA molecule begins degradation with a half-life of 2 minutes. It is being translated at a
rate of 10 ribosomes per minute, each producing a protein in 30 seconds. Derive an ODE for
the total protein copy number over time, accounting for both mRNA decay and protein dilution
(assume a cell division time of 30 minutes). Find the steady-state protein copy number.

**Problem 1.4 [Qualitative + Quantitative]**
Explain why the genetic code is degenerate. Using the mathematics of information theory,
calculate the minimum bits required to encode 20 amino acids. A triplet code with 4 nucleotides
can encode 4³ = 64 codons — calculate the information content of this code in bits and discuss
the redundancy. Why is degeneracy concentrated in the third codon position?

---

## Module 2: Cell Biology and Biochemistry

### Topic Arc
Enzyme kinetics (Michaelis-Menten derivation, inhibition) → Metabolic pathway analysis
(flux, control coefficients) → ATP synthesis (chemiosmosis, F₁F₀ stoichiometry) →
Membrane dynamics (endocytosis, vesicle budding energy) → Signal transduction
(receptor binding, cascade amplification, feedback)

### Sample Problems (preview)

**Problem 2.1 [Derivation]**
Derive the Michaelis-Menten equation from the quasi-steady-state assumption. Define what
"quasi-steady-state" means mathematically and state the conditions under which it holds.
Explain why the maximum velocity Vmax cannot be achieved in a finite substrate concentration.

**Problem 2.2 [Inhibition]**
An enzyme has Km = 0.5 mM and Vmax = 100 μmol/min. A competitive inhibitor with Ki = 1 mM
is added at 5 mM. Calculate the new apparent Km. A noncompetitive inhibitor with Ki = 2 mM
is added at 4 mM instead. Calculate the new apparent Vmax. Which inhibitor is more effective
at substrate concentrations far below Km? Far above Km? Derive your answers from the rate
equations.

**Problem 2.3 [Energetics]**
The F₀F₁ ATP synthase uses the proton motive force (PMF) across the inner mitochondrial
membrane to synthesize ATP. The PMF has two components: the electrical potential ΔΨ = -180 mV
and the pH gradient ΔpH = 1.4. Calculate the total PMF in mV. Given that 3 protons pass through
F₀ per ATP synthesized, calculate the free energy available per ATP synthesis event. Compare
this to the standard free energy of ATP hydrolysis (ΔG°' = -30.5 kJ/mol) and the actual
intracellular ΔG_ATP ≈ -50 kJ/mol.

---

## Module 3: Bacteriology

### Topic Arc
Bacterial growth kinetics (Monod equation, batch vs chemostat culture) →
Cell wall structure (peptidoglycan, D-amino acids, why penicillin works) →
Quorum sensing (autoinducer kinetics, bistability) → Horizontal gene transfer →
Phage-bacteria coevolution

### Sample Problems (preview)

**Problem 3.1 [Population dynamics]**
A bacterial culture follows Monod kinetics with μmax = 1.5 hr⁻¹ and Ks = 0.02 g/L. Starting
with 10⁶ cells/mL and 1 g/L glucose, derive and numerically solve the coupled ODEs for cell
density and substrate concentration. Plot the growth curve. At what substrate concentration
does growth rate fall to half its maximum?

**Problem 3.2 [Mechanistic pharmacology]**
Penicillin inhibits transpeptidase (PBP) enzymes. The D-Ala-D-Ala terminus of the growing
peptidoglycan is a structural analog of the active site transition state. Explain how penicillin
acts as a mechanism-based (suicide) inhibitor. Why does penicillin not kill slow-growing or
non-growing bacteria? Derive the relationship between bacterial growth rate, cell wall synthesis
rate, and penicillin efficacy.

---

## Module 4: Virology

### Topic Arc
Virus structure and classification → One-step growth curve analysis →
Viral replication kinetics → Antigenic drift vs shift → CRISPR-Cas as antiviral immunity →
Basic reproductive number R₀ and epidemic models

### Sample Problems (preview)

**Problem 4.1 [Quantitative virology]**
From a one-step growth experiment on bacteriophage T4, you observe: latent period = 25 min,
burst size = 200 phage/cell. Derive an equation for the total phage concentration as a function
of time. If the initial MOI (multiplicity of infection) = 0.01, what fraction of cells are
infected? What fraction are infected by ≥2 phage particles simultaneously? (Use Poisson statistics.)

**Problem 4.2 [Epidemiology]**
The basic reproductive number is R₀ = βN/γ, where β is transmission rate, N is population
size, and γ is recovery rate. Derive this from the SIR model differential equations.
For SARS-CoV-2 with R₀ ≈ 3, calculate the herd immunity threshold. If a vaccine is 80%
effective, what fraction of the population needs vaccination to achieve herd immunity?

---

## Production Plan

### Phase 1 (First delivery): Module 1 — Genetics and Molecular Biology
- Full lecture manuscript (~6000 words)
- 10 problems with full worked solutions
- 3–4 generated diagrams

### Phase 2: Module 2 — Cell Biology and Biochemistry

### Phase 3: Module 3 — Bacteriology

### Phase 4: Module 4 — Virology

---

## Open Questions for User

1. Should problems have a numerical difficulty rating (e.g., ★★★★☆)?
2. Should each problem specify which discipline it draws from (e.g., [Thermodynamics × Genetics])?
3. Do you want Python code labs in the notes (like the current series) or keep them separate?
4. Should the notes include historical context (who discovered what, key experiments) or stay purely mechanistic?
