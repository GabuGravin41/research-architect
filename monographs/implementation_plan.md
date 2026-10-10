# Biology from First Principles: Lecture Notes Series — Implementation Plan

## What This Is

A set of lecture manuscripts exploring fundamental biological systems by building up from physical and chemical first principles. The approach is the same throughout every chapter:

1. State the biological observation or experimental fact.
2. Identify what model or understanding we are missing to explain it.
3. Build that understanding from scratch — including any mathematics needed — without assuming background beyond basic algebra.
4. Arrive at a quantitative result that explains the observation.

The language throughout is neutral, precise, and conversational in the style of a scientific lecture. No dramatization.

---

## Proposed Chapter Structure

### Chapter 1 — Cell Membranes: Why Cells Need a Boundary
**Biological Observation:** Cells maintain internal ion concentrations that are dramatically different from their external environment. Potassium concentration inside a neuron is roughly $\times$30 higher than outside. This state is maintained against constant pressure to equilibrate.

**What we need to understand:**
- What is a lipid bilayer made of, and why does it form?
- Why does water not dissolve hydrophobic molecules? (entropy, hydrophobic effect — derived from scratch)
- Why are ions and polar molecules excluded from crossing the hydrophobic interior?
- Quantitative estimate of the energy cost of transferring a charge across a low-dielectric medium (Born equation, derived from Coulomb's law)

**Ends at:** A numerical estimate of why bare membranes are impermeable to $Na^+$, $K^+$, and charged molecules — and why protein channels are biologically necessary.

---

### Chapter 2 — Ion Channels: How Cells Move Ions Selectively
**Biological Observation:** Potassium channels conduct $K^+$ at near-diffusion rates, yet reject the physically smaller $Na^+$ ion by a factor of $\sim 10,000:1$.

**What we need to understand:**
- Ion hydration shells and the electrostatics that govern their strength
- The Born solvation equation (derived from Coulomb's law)
- How the selectivity filter geometry produces a thermodynamic trade-off between dehydration cost and coordination energy
- Boltzmann statistics applied to flux ratios

**Ends at:** A quantitative derivation of the selectivity ratio from free energy differences.

**Code lab:** Python simulation of net $\Delta G$ vs. pore radius for $K^+$ and $Na^+$.

---

### Chapter 3 — The Nernst Equation: Electrochemical Equilibrium Across Membranes
**Biological Observation:** Even when a channel is open, ions do not simply flow down their concentration gradient until equilibrium. At some membrane voltage, net ion flow stops — even though the concentration gradient still exists.

**What we need to understand:**
- What is a concentration gradient, and what force does it represent? (chemical potential, derived from entropy)
- What is membrane potential? What force does it represent? (electrostatic potential energy, derived from Coulomb's law)
- At equilibrium, these two forces balance — what voltage does this predict? (Nernst equation, derived algebraically)

**Ends at:** Derivation of the Nernst potential $E = \frac{RT}{zF}\ln\frac{[X]_o}{[X]_i}$ from scratch. Application to a real neuron.

---

### Chapter 4 — Nerve Impulses: The Hodgkin-Huxley Model
**Biological Observation:** Neurons generate electrical spikes (action potentials) that propagate along the axon at fixed amplitude and speed, regardless of stimulus intensity. This "all-or-nothing" behavior needs a mechanistic explanation.

**What we need to understand:**
- The membrane as an electrical circuit: capacitance and resistance (what do these mean physically?)
- Voltage-gated channels: ion conductance as a function of voltage
- The set of coupled differential equations Hodgkin and Huxley wrote to model membrane voltage over time
- How to numerically integrate a system of ODEs with Euler's method

**Ends at:** A runnable Python simulation of an action potential, built equation by equation.

---

### Chapter 5 — Diffusion: How Molecules Move Without Being Pushed
**Biological Observation:** A signaling molecule released at a synapse can reach a receptor on the postsynaptic membrane in microseconds, over a distance of $\sim 20 \text{ nm}$, without any active transport mechanism.

**What we need to understand:**
- Random walks: what happens when a particle takes steps in random directions?
- Derivation of the diffusion equation from a discrete random walk model
- What determines the diffusion coefficient? (Einstein-Stokes relation, derived from thermal energy)
- The timescale of diffusion as a function of distance: $t \sim \frac{r^2}{D}$, and when diffusion becomes too slow

**Ends at:** Quantitative estimates of how far molecules can diffuse in biologically relevant timescales, and why active transport (motors, vesicles) exists.

**Code lab:** Python simulation of a 2D random walk converging to the Gaussian diffusion profile.

---

### Chapter 6 — Enzymes: Catalysis and the Rate of Chemical Reactions
**Biological Observation:** The uncatalyzed hydrolysis of ATP has a half-life of thousands of years at physiological conditions. Inside cells, the enzyme ATPase drives this same reaction to completion in milliseconds. The enzyme does not change the equilibrium — only the rate.

**What we need to understand:**
- Transition state theory: what is an activation energy barrier, and where does it come from?
- Arrhenius equation: how does the rate depend on temperature and barrier height?
- Michaelis-Menten kinetics: a model of enzyme-substrate binding and catalysis derived from conservation equations
- Competitive inhibition: why drugs that block enzymes are designed to bind the active site

**Ends at:** Derivation of the Michaelis-Menten equation $v = \frac{v_{\max}[S]}{K_M + [S]}$ from mass balance. Application to drug design.

---

### Chapter 7 — Protein Folding: Why a Linear Sequence Becomes a 3D Structure
**Biological Observation:** A 100-residue protein folds reproducibly to the same three-dimensional structure in microseconds. The number of possible conformations is astronomical ($\sim 3^{100}$). How does folding converge to a single structure so quickly?

**What we need to understand:**
- What forces govern atomic interactions in proteins? (electrostatics, van der Waals, hydrogen bonding — physical origins of each)
- Hydrophobic effect as an entropic force (revisiting Chapter 1)
- Free energy landscape: the concept of an energy funnel
- Why exact computation of the folded state is intractable, and what approximations exist
- Where AlphaFold fits: as a learned statistical approximation of the energy landscape

**Ends at:** A clear picture of why protein folding was an unsolved problem, what approximations were made historically, and how AlphaFold represents a particular class of solution.

---

### Chapter 8 — DNA and Molecular Information
**Biological Observation:** The genetic code maps 64 possible codons (triplets of 4 bases) onto 20 amino acids plus stop signals. This mapping is nearly universal across all life on Earth.

**What we need to understand:**
- Information theory: Shannon entropy applied to biological sequences (built from the concept of probability)
- Why 3 bases per codon? Minimum code length to represent 20 symbols (derived algebraically)
- DNA as a physical molecule: stability, base pairing energetics, melting temperature (derived from Boltzmann statistics)
- Replication error rates and their physical limits

**Ends at:** A quantitative estimate of mutation rates and the information-theoretic constraints on genetic code design.

---

### Chapter 9 — Gene Expression: From DNA to Protein
**Biological Observation:** Not all genes are expressed at all times. The same genome gives rise to a liver cell, a neuron, and a skin cell. Differential gene expression is controlled by regulatory proteins (transcription factors) that bind specific DNA sequences.

**What we need to understand:**
- Transcription and translation as molecular machines
- Binding equilibria: how tightly must a transcription factor bind to its target sequence to be specific?
- Statistical mechanics of gene regulation: thermodynamic models of gene switches
- The concept of cooperative binding (Hill equation) and its role in creating sharp gene expression thresholds

**Ends at:** A thermodynamic model of a simple genetic switch and the conditions required for bistability.

---

### Chapter 10 — Evolution: Selection, Drift, and the Population Genetics of Change
**Biological Observation:** In a population of bacteria exposed to an antibiotic, resistant mutants that exist at a frequency of 1 in $10^9$ can take over the population within days.

**What we need to understand:**
- Population genetics: what determines whether a mutation survives or disappears? (Wright-Fisher model)
- Selection coefficient: how to quantify the fitness advantage of a mutation
- Genetic drift: why neutral mutations can still fix in small populations
- The mathematics of fixation probability (derived from random walk theory)

**Ends at:** A quantitative model of when selection dominates over drift, and what determines the rate of evolution.

---

## Tone and Format Guidelines

- Equations are derived step by step. No equation appears without a derivation or a clear explanation of where each term comes from.
- All mathematics starts from algebra or intuitive physical reasoning. Calculus is introduced when needed, with an explanation of what a derivative or integral means before it is used.
- No theatrical language, no dramatized "mysteries." State the observation, state what we do not yet understand, then work through the understanding.
- Code labs are included where numerical insight is valuable: wherever a closed-form answer does not exist, or where visualizing a result clarifies the physics.
- Each chapter ends with a summary of the physical principles established and a brief note on where the current model breaks down — which naturally motivates the next chapter or further study.

---

## Open Questions for Review

> [!IMPORTANT]
> **Scope confirmation:** The above plan is 10 chapters. Do you want all 10 written, or should we start with a subset (e.g., Chapters 1–5 covering membranes, channels, and nerve impulses as a cohesive unit)?

> [!IMPORTANT]
> **Depth per chapter:** Each chapter could be 2,000–4,000 words with full derivations. Do you want that level of depth, or shorter, more compact treatment?

> [!IMPORTANT]
> **Code labs:** Do you want the Python code written as part of each chapter manuscript, or separately?

> [!IMPORTANT]
> **Images/diagrams:** Should each chapter include generated illustrations (as in the previous ion channel image), or is text and equations sufficient?
