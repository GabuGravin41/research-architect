# Chapter 3 — Electrochemical Equilibrium: The Nernst Equation

## 3.1 Observation: The Balance of Forces Across a Membrane

Consider a fundamental biological experiment. A synthetic lipid bilayer membrane is formed, separating two fluid-filled compartments. This membrane is initially impermeable to all ions. We fill the left compartment with a solution containing $150 \text{ mM}$ of potassium chloride ($\text{KCl}$), and the right compartment with a solution containing $5 \text{ mM}$ of $\text{KCl}$. Because the membrane is impermeable, the system sits statically; no ions move, and both compartments remain electrically neutral.

Now, we insert a specialized protein into this membrane: a potassium-selective ion channel. This channel forms a pore that allows potassium ions ($\text{K}^+$) to pass through freely, while strictly excluding chloride ions ($\text{Cl}^-$) and all other molecules.

Based on the macroscopic laws of diffusion, we expect $\text{K}^+$ to flow from the region of high concentration (the left compartment) to the region of low concentration (the right compartment). We expect this flow to continue until the concentrations in both compartments are equal.

However, if we place recording electrodes into both compartments and measure the electrical potential difference (the voltage) across the membrane as this process occurs, we observe something different. A tiny fraction of $\text{K}^+$ ions moves from left to right. As these positively charged ions leave the left compartment, they leave behind an excess of negatively charged $\text{Cl}^-$ ions. As they enter the right compartment, they create a local excess of positive charge. This charge separation across the insulating lipid bilayer generates an electrical potential difference.

We find that the net flow of $\text{K}^+$ stops almost immediately. The concentrations in the two bulk compartments have barely changed—they remain essentially $150 \text{ mM}$ and $5 \text{ mM}$. Yet, the net flux of $\text{K}^+$ is zero. If we measure the voltage across the membrane at this state of zero net flux, we record a value of approximately $-90 \text{ mV}$ (with the left, high-concentration side defined as the reference or "inside", and the right side as negative relative to it).

This presents a physical question: a massive concentration gradient still exists, which should drive $\text{K}^+$ from left to right. What physical force is precisely balancing this concentration-driven flow, resulting in a net flux of zero? To answer this, we must build a formal thermodynamic model of ions in solution.

![Electrochemical Driving Forces Across a Membrane](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/ch3_nernst_electrochemical_1785631853360.jpg)

## 3.2 Chemical Potential: The Thermodynamic Driving Force

To understand why molecules move, we must understand the energy of the system. In thermodynamics, a system held at constant temperature and pressure will spontaneously evolve toward a state that minimizes its Gibbs free energy, denoted as $G$.

The Gibbs free energy represents the energy available to do non-expansion work. When a chemical or physical process occurs spontaneously, the change in Gibbs free energy, $\Delta G$, is negative. When a system is at equilibrium, $G$ is at a minimum, and any infinitesimal change in the state of the system results in $\Delta G = 0$.

We define a quantity called the chemical potential, $\mu$, for a specific chemical species in a mixture. The chemical potential is the partial derivative of the Gibbs free energy with respect to the number of moles, $n$, of that species, holding temperature ($T$), pressure ($P$), and the amounts of all other species ($n_{j \neq i}$) constant:

$$ \mu_i = \left( \frac{\partial G}{\partial n_i} \right)_{T, P, n_{j \neq i}} $$

In words, the chemical potential $\mu_i$ is the free energy per mole of species $i$ in the system. If species $i$ has a higher chemical potential in region A than in region B, the species will spontaneously move from A to B, because doing so reduces the total Gibbs free energy of the system.

We must determine how the chemical potential depends on the concentration of the species. We can derive this relationship from fundamental statistical mechanics, specifically by examining the entropy of mixing.

Consider a volume $V$ containing $N$ molecules of a solute (like $\text{K}^+$) dissolved in a solvent (like water). The entropy of this system, $S$, is related to the number of accessible microstates, $\Omega$, by Boltzmann's equation:

$$ S = k_B \ln \Omega $$

where $k_B$ is the Boltzmann constant. A microstate is a specific microscopic arrangement of the molecules. For a dilute solution, the number of ways to arrange the $N$ solute molecules in the volume $V$ scales with $V^N$. Therefore, the number of microstates is proportional to $V^N$:

$$ \Omega \propto V^N $$

Substituting this into Boltzmann's equation gives the entropy associated with the volume available to the solute:

$$ S \propto k_B \ln(V^N) = N k_B \ln V $$

Concentration, which we will denote as $[X]$, is proportional to the number of molecules divided by the volume: $[X] \propto N/V$, which means $V \propto N/[X]$. If we substitute this into our entropy expression (and absorb proportionality constants into a reference state), we find that the entropy depends on the logarithm of the concentration:

$$ S = S^\circ - N k_B \ln[X] $$

where $S^\circ$ is the entropy at a standard reference concentration.

The Gibbs free energy is defined as $G = H - TS$, where $H$ is enthalpy. If we assume the interactions between solute molecules are negligible (an ideal dilute solution), the enthalpy does not depend on concentration. Therefore, the concentration dependence of $G$ comes entirely from the entropy term:

$$ G = G^\circ - T(S^\circ - N k_B \ln[X]) $$
$$ G = G^\circ - TS^\circ + N k_B T \ln[X] $$

To find the chemical potential $\mu$, we express this on a per-mole basis. Using the number of moles $n = N/N_A$, where $N_A$ is Avogadro's number, and the ideal gas constant $R = N_A k_B$:

$$ \mu = \mu^\circ + RT \ln[X] $$

Here:
- $\mu$ is the chemical potential of species X (Joules/mol).
- $\mu^\circ$ is the standard chemical potential, the value of $\mu$ when the concentration is at the standard state (typically $1 \text{ M}$).
- $R$ is the universal gas constant ($8.314 \text{ J mol}^{-1} \text{ K}^{-1}$).
- $T$ is the absolute temperature in Kelvin.
- $[X]$ is the molar concentration of the species.

We can now calculate the chemical potential difference for $\text{K}^+$ across the membrane in our initial observation. The driving force for the movement of $\text{K}^+$ from the inside (left) to the outside (right) is the difference in chemical potential:

$$ \Delta\mu_{\text{chem}} = RT \ln\left( \frac{[\text{K}^+]_{\text{out}}}{[\text{K}^+]_{\text{in}}} \right) $$

At physiological temperature, $T = 310 \text{ K}$, $RT \approx 2.577 \text{ kJ/mol}$. Using $[\text{K}^+]_{\text{in}} = 150 \text{ mM}$ and $[\text{K}^+]_{\text{out}} = 5 \text{ mM}$:

$$ \Delta\mu_{\text{chem}} = (2.577 \text{ kJ mol}^{-1}) \ln\left(\frac{5}{150}\right) = (2.577)(-3.401) \approx -8.76 \text{ kJ/mol} $$

The negative sign indicates that moving a mole of $\text{K}^+$ from the inside compartment to the outside compartment results in a decrease in the system's free energy by $8.76 \text{ kJ}$. The process is spontaneous. The concentration gradient exerts a chemical driving force pushing $\text{K}^+$ outward.

## 3.3 Electrical Potential Energy

Potassium ions are not merely particles; they are charged particles. When charged particles exist in a region with an electric field, they possess electrical potential energy.

In physics, the electrical potential, denoted by $\phi$ (or $V$), is defined as the potential energy per unit of positive charge. If a particle has a charge $q$ and is located at a position where the electrical potential is $\phi$, its electrical potential energy $U_{\text{elec}}$ is:

$$ U_{\text{elec}} = q\phi $$

For a single ion, its charge is given by $q = ze$, where $z$ is the valence (the integer number of elementary charges) and $e$ is the elementary charge ($1.602 \times 10^{-19} \text{ Coulombs}$). For $\text{K}^+$, $z = +1$. For $\text{Ca}^{2+}$, $z = +2$. For $\text{Cl}^-$, $z = -1$.

Because we are working in macroscopic units (moles) rather than single particles, we must multiply the charge of one ion by Avogadro's number ($N_A$) to get the charge per mole. The product of the elementary charge and Avogadro's number is Faraday's constant, $F$:

$$ F = e \times N_A = (1.602 \times 10^{-19} \text{ C}) \times (6.022 \times 10^{23} \text{ mol}^{-1}) \approx 96{,}485 \text{ C mol}^{-1} $$

Therefore, the charge of one mole of an ion is $zF$. The electrical potential energy per mole of that ion at an electrical potential $\phi$ is:

$$ \mu_{\text{elec}} = zF\phi $$

The biological membrane acts as a capacitor. The lipid bilayer is a thin, insulating dielectric layer separating two conductive aqueous solutions. When a tiny number of ions cross the membrane without an accompanying counter-ion, they deposit charge on the surface of the membrane capacitance. This creates an electric field across the bilayer and a corresponding difference in electrical potential between the two compartments.

We define the membrane potential, $V_m$, as the difference in electrical potential between the inside of the cell and the outside. By strict convention, the outside is defined as the reference potential ($\phi_{\text{out}} = 0$), so:

$$ V_m = \phi_{\text{in}} - \phi_{\text{out}} $$

The change in molar electrical potential energy for an ion moving from the inside to the outside is:

$$ \Delta\mu_{\text{elec}} = zF\phi_{\text{out}} - zF\phi_{\text{in}} = -zFV_m $$

In a typical resting cell, $V_m \approx -70 \text{ mV}$ to $-90 \text{ mV}$. At $V_m = -90 \text{ mV} = -0.090 \text{ V}$, for potassium ($z = +1$):

$$ \Delta\mu_{\text{elec}} = -(1)(96{,}485 \text{ C mol}^{-1})(-0.090 \text{ V}) \approx +8{,}684 \text{ J mol}^{-1} = +8.68 \text{ kJ/mol} $$

Notice the sign. $\Delta\mu_{\text{elec}}$ is positive. This means moving a mole of $\text{K}^+$ from the inside (which is negatively charged) to the outside (which is relatively positive) requires an input of work. The electric field opposes the movement of the positive ion outward.

## 3.4 The Electrochemical Potential

We now have two distinct driving forces acting on the ions:
1. A chemical force driving them down their concentration gradient.
2. An electrical force driving them down their electrical potential gradient.

The total driving force determining the spontaneous movement of an ion is the sum of these two contributions. This sum is the electrochemical potential, denoted as $\tilde{\mu}$:

$$ \tilde{\mu} = \mu_{\text{chem}} + \mu_{\text{elec}} = \mu^\circ + RT \ln[X] + zF\phi $$

The change in electrochemical potential when an ion moves from the inside to the outside of the membrane is:

$$ \Delta\tilde{\mu} = RT \ln\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) - zFV_m $$

Looking at the values we calculated for our potassium channel experiment:
- The chemical gradient provides $\Delta\mu_{\text{chem}} \approx -8.76 \text{ kJ/mol}$ (pushing $\text{K}^+$ outward).
- The electrical gradient provides $\Delta\mu_{\text{elec}} \approx +8.68 \text{ kJ/mol}$ (pulling $\text{K}^+$ inward).

The total electrochemical driving force $\Delta\tilde{\mu}$ is the sum: $-8.76 \text{ kJ/mol} + 8.68 \text{ kJ/mol} = -0.08 \text{ kJ/mol} \approx 0$.

When the chemical driving force exactly equals and opposes the electrical driving force, the net change in free energy for moving an ion across the membrane is zero ($\Delta\tilde{\mu} = 0$). This defines a state of thermodynamic equilibrium. At equilibrium, there is no longer any net thermodynamic driving force, and therefore the net flux of the ion across the membrane is zero. The number of ions moving outward due to random thermal motion is perfectly balanced by the number of ions drawn inward by the electric field.

This explains our initial observation. The $\text{K}^+$ ions flow down their concentration gradient initially. Because they carry charge, this minute initial flow rapidly builds up an opposing electrical potential (voltage) across the membrane capacitor. The voltage grows until the electrical pull inward exactly matches the chemical push outward. At this precise voltage, the system reaches equilibrium, and net movement ceases, even though the large concentration gradient remains intact.

## 3.5 Derivation of the Nernst Equation

We can formalize this equilibrium condition to find the exact electrical potential required to balance any given concentration gradient. We start with the condition for electrochemical equilibrium:

$$ \Delta\tilde{\mu} = 0 $$
$$ RT \ln\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) - zFV_m = 0 $$

We rearrange this equation to solve for the membrane potential, $V_m$:

$$ zFV_m = RT \ln\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) $$

$$ V_m = \frac{RT}{zF} \ln\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) $$

This is the Nernst equation. The value of $V_m$ that satisfies this equation for a specific ion is called the equilibrium potential (or Nernst potential) for that ion, often denoted as $E_X$:

$$ E_X = \frac{RT}{zF} \ln\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) $$

The Nernst equation tells us the electrical voltage required to exactly balance a given concentration gradient for a specific ion, such that there is no net flux of that ion across a permeable membrane.

### Evaluating the Nernst Equation

The prefactor $RT/F$ at biological temperatures:
- At $20^\circ\text{C}$ ($T = 293 \text{ K}$): $RT/F \approx 25.2 \text{ mV}$
- At $37^\circ\text{C}$ ($T = 310 \text{ K}$): $RT/F \approx 26.7 \text{ mV}$

Using the conversion $\ln(x) = 2.303 \log_{10}(x)$, the Nernst equation at $37^\circ\text{C}$ becomes:

$$ E_X = \frac{61.5 \text{ mV}}{z} \log_{10}\left( \frac{[X]_{\text{out}}}{[X]_{\text{in}}} \right) $$

A useful rule of thumb: for a monovalent ion ($z = \pm 1$) at $37^\circ\text{C}$, every 10-fold difference in concentration across the membrane contributes $61.5 \text{ mV}$ to the equilibrium potential.

### Example Calculations for a Mammalian Neuron

**Potassium ($\text{K}^+$, $z = +1$):**
$[\text{K}^+]_{\text{out}} = 5 \text{ mM}$, $[\text{K}^+]_{\text{in}} = 140 \text{ mM}$:
$$ E_K = \frac{61.5}{+1} \log_{10}\left( \frac{5}{140} \right) = 61.5 \times (-1.447) \approx -89 \text{ mV} $$

**Sodium ($\text{Na}^+$, $z = +1$):**
$[\text{Na}^+]_{\text{out}} = 145 \text{ mM}$, $[\text{Na}^+]_{\text{in}} = 12 \text{ mM}$:
$$ E_{Na} = \frac{61.5}{+1} \log_{10}\left( \frac{145}{12} \right) = 61.5 \times 1.082 \approx +67 \text{ mV} $$

**Chloride ($\text{Cl}^-$, $z = -1$):**
$[\text{Cl}^-]_{\text{out}} = 110 \text{ mM}$, $[\text{Cl}^-]_{\text{in}} = 10 \text{ mM}$:
$$ E_{Cl} = \frac{61.5}{-1} \log_{10}\left( \frac{110}{10} \right) = -61.5 \times 1.041 \approx -64 \text{ mV} $$

**Calcium ($\text{Ca}^{2+}$, $z = +2$):**
$[\text{Ca}^{2+}]_{\text{out}} = 2 \text{ mM}$, $[\text{Ca}^{2+}]_{\text{in}} = 0.0001 \text{ mM}$:
$$ E_{Ca} = \frac{61.5}{+2} \log_{10}\left( \frac{2}{0.0001} \right) = 30.75 \times 4.301 \approx +132 \text{ mV} $$

The measured resting membrane potential of a typical neuron is around $-70 \text{ mV}$. This value is not equal to the equilibrium potential of any single ion. This tells us a fundamental biological truth: at rest, the neuronal membrane is not perfectly selective for just one ion. It is permeable to multiple ions simultaneously.

## 3.6 The Goldman-Hodgkin-Katz Equation

When a membrane is permeable to more than one ion, the system cannot reach a true thermodynamic equilibrium for all ions simultaneously, because the equilibrium potentials are different. If the membrane potential is at $-70 \text{ mV}$, it is not at $E_K$ ($-89 \text{ mV}$) and it is certainly not at $E_{Na}$ ($+67 \text{ mV}$).

Because the actual membrane potential is not equal to their respective equilibrium potentials, there is a net electrochemical driving force on both ions:
- The driving force on $\text{K}^+$ is $V_m - E_K = -70 - (-89) = +19 \text{ mV}$. This positive driving force pushes $\text{K}^+$ *outward*.
- The driving force on $\text{Na}^+$ is $V_m - E_{Na} = -70 - 67 = -137 \text{ mV}$. This massive negative driving force strongly pushes $\text{Na}^+$ *inward*.

Because there is a driving force and the membrane is permeable (has conductance), ions will flow. $\text{Na}^+$ leaks into the cell, and $\text{K}^+$ leaks out.

However, the membrane potential remains stable at $-70 \text{ mV}$. This means the total macroscopic charge inside the cell is not changing over time. For the total charge to remain constant, the net electrical current across the membrane must be zero. The inward current of positive charge (carried mostly by $\text{Na}^+$) must exactly equal the outward current of positive charge (carried mostly by $\text{K}^+$).

This is a **steady state**, not an equilibrium. The macroscopic voltage is constant because fluxes cancel out, but individual species are constantly moving down their gradients.

To calculate the membrane potential in this multi-ion steady state, we use the Goldman-Hodgkin-Katz (GHK) voltage equation. The GHK equation is derived by assuming a constant electric field across the thickness of the membrane (the voltage drops linearly from inside to outside) and by setting the sum of all individual ion currents to zero ($I_K + I_{Na} + I_{Cl} = 0$). The resulting equation calculates a steady-state membrane potential as a weighted average of the concentration gradients, where the weighting factors are the relative permeabilities of the membrane to each ion:

$$ V_m = \frac{RT}{F} \ln \left( \frac{P_K[\text{K}^+]_{\text{out}} + P_{Na}[\text{Na}^+]_{\text{out}} + P_{Cl}[\text{Cl}^-]_{\text{in}}}{P_K[\text{K}^+]_{\text{in}} + P_{Na}[\text{Na}^+]_{\text{in}} + P_{Cl}[\text{Cl}^-]_{\text{out}}} \right) $$

Here, $P_K, P_{Na},$ and $P_{Cl}$ represent the permeability of the membrane to each respective ion, typically measured in units of velocity (m/s). Permeability depends on the number of open ion channels for that specific species.

Notice the critical detail regarding chloride ($\text{Cl}^-$). The term for chloride uses inside concentration in the numerator and outside concentration in the denominator—opposite to the cations. This inversion occurs because chloride is an anion ($z = -1$). The negative sign from its valence inverts the ratio inside the logarithm during the derivation.

At a common resting permeability ratio $P_K : P_{Na} : P_{Cl} \approx 1 : 0.04 : 0.45$ at $37^\circ\text{C}$:

$$ V_m = 26.7 \ln \left( \frac{(1)(5) + (0.04)(145) + (0.45)(10)}{(1)(140) + (0.04)(12) + (0.45)(110)} \right) $$
$$ V_m = 26.7 \ln \left( \frac{15.3}{189.98} \right) = 26.7 \times (-2.519) \approx -67.3 \text{ mV} $$

This calculation yields a steady-state membrane potential of roughly $-67 \text{ mV}$, which aligns closely with experimentally measured resting potentials.

The power of the GHK equation is that it bridges the molecular state of the membrane (which channels are open, represented by $P_X$) to the macroscopic electrical property of the cell ($V_m$). For example, during an action potential, voltage-gated sodium channels rapidly open, increasing $P_{Na}$ such that it transiently becomes much larger than $P_K$. If $P_{Na} \gg P_K$, the GHK equation becomes dominated by the sodium terms, and $V_m$ shifts dramatically toward $E_{Na}$ ($+67 \text{ mV}$). This describes the rising phase of the action potential.

## 3.7 The Na+/K+ ATPase: Sustaining the Non-Equilibrium State

The GHK calculation reveals a profound implication. At the resting potential of $-70 \text{ mV}$, neither $\text{Na}^+$ nor $\text{K}^+$ is at electrochemical equilibrium.
- $\text{Na}^+$ experiences a large inward driving force and slowly leaks into the cell.
- $\text{K}^+$ experiences a smaller outward driving force and slowly leaks out of the cell.

If this state were allowed to persist passively, the inward leak of $\text{Na}^+$ and outward leak of $\text{K}^+$ would slowly dilute the concentration gradients. Eventually, the gradients would collapse, and the membrane potential would drop to zero. The cell would die.

The resting potential is a non-equilibrium steady state. It must be actively maintained by continuous expenditure of metabolic energy. The primary engine driving this maintenance is the **$\text{Na}^+/\text{K}^+$-ATPase** (the sodium-potassium pump).

This ubiquitous transmembrane enzyme uses the chemical energy stored in adenosine triphosphate (ATP) to perform thermodynamic work, pushing ions *against* their electrochemical gradients. For every single molecule of ATP hydrolyzed to ADP and inorganic phosphate, the pump extrudes 3 $\text{Na}^+$ ions from the inside to the outside, and imports 2 $\text{K}^+$ ions from the outside to the inside.

We can calculate the thermodynamic work required for one cycle of the pump at $V_m = -70 \text{ mV}$.

**Work to move 3 $\text{Na}^+$ outward per mole:**

$$ \Delta\tilde{\mu}_{Na, \text{out}} = RT \ln\left(\frac{[\text{Na}^+]_{\text{out}}}{[\text{Na}^+]_{\text{in}}}\right) + zF(V_{\text{out}} - V_{\text{in}}) $$
$$ = 2.577 \ln\left(\frac{145}{12}\right) + (+1)(96.485)(0 - (-0.070)) $$
$$ = 6.42 \text{ kJ/mol} + 6.75 \text{ kJ/mol} = +13.17 \text{ kJ/mol} $$

For 3 moles of $\text{Na}^+$: $3 \times 13.17 = +39.51 \text{ kJ}$.

**Work to move 2 $\text{K}^+$ inward per mole:**

$$ \Delta\tilde{\mu}_{K, \text{in}} = RT \ln\left(\frac{[\text{K}^+]_{\text{in}}}{[\text{K}^+]_{\text{out}}}\right) + zF(V_{\text{in}} - V_{\text{out}}) $$
$$ = 2.577 \ln\left(\frac{140}{5}\right) + (+1)(96.485)(-0.070 - 0) $$
$$ = 8.59 \text{ kJ/mol} - 6.75 \text{ kJ/mol} = +1.84 \text{ kJ/mol} $$

For 2 moles of $\text{K}^+$: $2 \times 1.84 = +3.68 \text{ kJ}$.

**Total Work per pump cycle:** $39.51 + 3.68 = +43.19 \text{ kJ}$.

The hydrolysis of one mole of ATP under typical intracellular conditions yields approximately $-50$ to $-60 \text{ kJ/mol}$ of free energy. Because $|-50 \text{ kJ/mol}| > +43.19 \text{ kJ/mol}$, the ATP hydrolysis provides enough energy to drive the pump cycle forward, with high thermodynamic efficiency.

Because the pump moves 3 positive charges out for every 2 positive charges in, it results in a net extrusion of 1 positive charge per cycle. This means the pump itself generates an electrical current (it is an **electrogenic** pump). This pump current adds a small outward hyperpolarizing term to the membrane potential, usually contributing about $-3$ to $-5 \text{ mV}$ to the total resting potential.

A human brain consumes roughly 20% of the body's total energy budget. It is estimated that upwards of 50-60% of that brain energy is spent exclusively on fueling the $\text{Na}^+/\text{K}^+$-ATPase to maintain these ion gradients against the constant passive leaks. Life, at the cellular level, is a continuous, energy-intensive fight against thermodynamic equilibrium.

## 3.8 Python Code Lab: Modeling Nernst and GHK

```python
import numpy as np
import matplotlib.pyplot as plt

# Constants
R = 8.314   # Gas constant (J / (mol * K))
F = 96485   # Faraday constant (C / mol)

# Ion Concentrations (mM)
K_out, K_in, z_K    = 5.0,    140.0,  1
Na_out, Na_in, z_Na = 145.0,  12.0,   1
Ca_out, Ca_in, z_Ca = 2.0,    0.0001, 2
Cl_out, Cl_in       = 110.0,  10.0

# ---- Part 1: Nernst Potentials vs. Temperature ----
temp_C = np.linspace(0, 45, 100)
temp_K = temp_C + 273.15

def nernst(C_out, C_in, z, T):
    """Calculates the Nernst potential in millivolts."""
    return (R * T) / (z * F) * np.log(C_out / C_in) * 1000

E_K  = nernst(K_out,  K_in,  z_K,  temp_K)
E_Na = nernst(Na_out, Na_in, z_Na, temp_K)
E_Ca = nernst(Ca_out, Ca_in, z_Ca, temp_K)

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(temp_C, E_Ca, label='Ca2+', color='purple', linewidth=2)
plt.plot(temp_C, E_Na, label='Na+',  color='red',    linewidth=2)
plt.plot(temp_C, E_K,  label='K+',   color='blue',   linewidth=2)
plt.axvline(x=37, color='gray', linestyle=':', label='37°C')
plt.title('Nernst Potentials vs Temperature', fontsize=12)
plt.xlabel('Temperature (°C)', fontsize=11)
plt.ylabel('Equilibrium Potential (mV)', fontsize=11)
plt.grid(True, alpha=0.3)
plt.legend()

# ---- Part 2: GHK Potential vs. Na/K Permeability Ratio ----
T_phys = 310.15   # 37 degrees C in Kelvin

alpha = np.logspace(-2, 1.7, 200)  # P_Na / P_K ratio

def ghk_voltage(alpha, P_Cl_rel=0.45):
    """
    Calculates GHK voltage.
    alpha = P_Na / P_K. All terms divided by P_K.
    """
    numerator   = K_out + alpha * Na_out + P_Cl_rel * Cl_in
    denominator = K_in  + alpha * Na_in  + P_Cl_rel * Cl_out
    return (R * T_phys) / F * np.log(numerator / denominator) * 1000

Vm_curve = ghk_voltage(alpha)

plt.subplot(1, 2, 2)
plt.plot(alpha, Vm_curve, color='black', linewidth=2)
plt.xscale('log')
plt.title('GHK Potential vs $P_{Na}/P_K$ Ratio', fontsize=12)
plt.xlabel('Permeability Ratio ($P_{Na}/P_K$)', fontsize=11)
plt.ylabel('Membrane Potential (mV)', fontsize=11)
plt.grid(True, alpha=0.3)

# Annotate Resting state
resting_alpha = 0.04
resting_Vm    = ghk_voltage(resting_alpha)
plt.plot(resting_alpha, resting_Vm, 'bo', markersize=8)
plt.annotate(f'Resting\n~{resting_Vm:.1f} mV',
             xy=(resting_alpha, resting_Vm), xytext=(0.006, -50),
             arrowprops=dict(facecolor='blue', arrowstyle='->'))

# Annotate Action Potential Peak state
ap_alpha = 15.0
ap_Vm    = ghk_voltage(ap_alpha)
plt.plot(ap_alpha, ap_Vm, 'ro', markersize=8)
plt.annotate(f'AP Peak\n~{ap_Vm:.1f} mV',
             xy=(ap_alpha, ap_Vm), xytext=(2, 20),
             arrowprops=dict(facecolor='red', arrowstyle='->'))

plt.tight_layout()
plt.show()
```

The left panel demonstrates that Nernst potentials scale linearly with absolute temperature, since $E_X = (RT/zF)\ln(C_o/C_i)$. The right panel visualizes the entire spectrum from a potassium-dominated resting state (low $P_{Na}/P_K$, left side) to a sodium-dominated depolarized state (high $P_{Na}/P_K$, right side), with the annotated points corresponding to the resting potential and the peak of an action potential.

## 3.9 Summary and Where the Model Breaks Down

In this chapter, we established the physical principles governing ion movement across biological membranes:

1. **Thermodynamic drive:** Ions move to minimize the Gibbs free energy of the system. The chemical potential $\mu$ quantifies the energy tied to concentration, derived from the entropy of mixing.
2. **Electrical drive:** The membrane acts as a capacitor. Charge separation creates an electric field that exerts a force on charged particles, quantified by electrical potential energy.
3. **The Nernst equation:** Equating the chemical and electrical potentials gives the exact voltage required to halt the net flux of a specific ion, establishing a thermodynamic equilibrium.
4. **The GHK equation:** Real membranes are permeable to multiple ions, requiring a steady-state model where net currents, rather than individual fluxes, sum to zero.
5. **Active maintenance:** The resting state is not an equilibrium, but an energy-dissipating steady state maintained constantly by the Na+/K+ ATPase.

**Limitations and Breakdown of the GHK Model**

1. **The constant field assumption:** The GHK derivation assumes that the voltage drops linearly across the membrane. In reality, ion channels are complex protein pores with localized binding sites, charged amino acid residues, and varying local dielectric properties. The voltage drop inside a pore is rarely linear.

2. **The independence principle:** The GHK derivation assumes that the movement of one ion is completely independent of the movement of other ions. This assumption fails dramatically in long, narrow channel pores (like the KcsA potassium channel) where ions must line up single-file. In such multi-ion pores, ions repel each other electrostatically, and the flux of ions in one direction strongly inhibits flux in the opposite direction. When the independence principle fails, we use the **Ussing flux-ratio criterion** to identify it. For independent movement, the ratio of unidirectional efflux to influx should equal:
$$ \frac{J_{\text{out}}}{J_{\text{in}}} = \exp\left( \frac{zF(V_m - E_x)}{RT} \right) $$

3. **Divalent ions:** Incorporating divalent ions like $\text{Ca}^{2+}$ or $\text{Mg}^{2+}$ directly into the standard GHK voltage equation is mathematically complex and rarely yields accurate results without correction factors, because the energy scaling with $z^2$ leads to strong deviations from the constant field assumption within the channel pore.

In deep biophysics, when the GHK assumptions break down, researchers abandon it in favor of **Rate Theory models** (modeling the channel as a series of discrete energy barriers and wells) or **Molecular Dynamics simulations** (simulating every atom and water molecule directly). However, as a macroscopic bridge between molecular permeabilities and cellular voltage, the Nernst and GHK frameworks remain the foundational pillars of cellular electrophysiology. The voltage-dependent changes in channel permeabilities described here are the basis of the full action potential model presented in the next chapter.
