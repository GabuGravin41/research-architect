# Discovery Institute — First-Principles Science & Mathematical Foundations

An exhaustive, self-contained educational research institute and curriculum covering **Biophysics, Molecular Biology, Mathematics, Physics, Chemistry, and Theoretical Computation**.

---

## 1. Curriculum Overview

The Discovery Institute breaks down scientific understanding into zero-assumption, mathematically derived monographs and computational simulations:

### A. Biophysics & Cellular Dynamics (`monographs/`)
- **Chapter 1: Biological Membranes & Solvation**: Lipid bilayer thermodynamics, self-assembly, Gouy-Chapman-Stern electrical double layer.
- **Chapter 2: Ion Channels & Selectivity Filters**: Born solvation energy, coordination cages, sub-angstrom dehydration filters ($K^+$ vs $Na^+$).
- **Chapter 3: Nernst & Electrochemical Equilibrium**: Chemical potentials, Goldman-Hodgkin-Katz (GHK) voltage equation, active pumps.
- **Chapter 4: Hodgkin-Huxley Action Potentials**: Non-linear conductance ODE systems, sodium activation/inactivation, limit cycles.
- **Chapter 5: Diffusion & Brownian Motion**: Fick's laws, Einstein-Smoluchowski relation, random walk Monte Carlo simulations.

### B. Core Disciplines
- **`Rediscovering Mathematics/`**: Category theory, real analysis, differential geometry, and algebraic topology.
- **`Rediscovering Physics/`**: Classical mechanics, electrodynamics, Dirac relativistic quantum mechanics, and QED.
- **`Rediscovering Chemistry/`**: Quantum chemical bonding, thermodynamics, and molecular reaction kinetics.
- **`Rediscovering Computation/`**: Turing machines, lambda calculus, compiler design, and automata theory.

---

## 2. Directory Structure

```
discovery institute/
├── monographs/                     # Cellular biophysics monographs & diagrams
│   ├── chapter_01_membranes.md
│   ├── chapter_02_ion_channels.md
│   ├── chapter_03_nernst.md
│   ├── chapter_04_hodgkin_huxley.md
│   ├── chapter_05_diffusion.md
│   ├── simulate_ion_channel.py     # Numerical solver for ion channel kinetics
│   └── *.jpg / *.png               # High-resolution anatomical & physical diagrams
├── Rediscovering Chemistry/
├── Rediscovering Computation/
├── Rediscovering Mathematics/
├── Rediscovering Physics/
├── main.py                         # Standalone runner
├── requirements.txt
└── README.md
```

---

## 3. Quick Start (Standalone Execution)

```bash
pip install -r requirements.txt
python main.py
```
To run the ion channel and diffusion simulation directly:
```bash
python monographs/simulate_ion_channel.py
```
