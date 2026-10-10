# Chapter 4 — Propagating Electrical Signals: The Hodgkin-Huxley Model

## 1. Observation: The Phenomenon of the Action Potential

If we are to understand the nervous system—how it computes, how it moves muscles, how it perceives the world—we must begin by understanding its fundamental unit of communication. We must understand how a signal travels from one end of a neuron to the other.

Historically, this presented a profound physical puzzle. Imagine a long, thin tube filled with a salty fluid—an axon. If you inject a small electrical current into one end of this tube, the voltage will change locally, but that electrical signal will decay rapidly as it spreads down the length of the tube. This happens because the tube is not a perfect insulator; the membrane leaks current, and the internal fluid has electrical resistance. If a nerve fiber acted merely as a passive electrical cable, a signal generated in your spinal cord would dissipate completely before it ever reached your toe. It would be useless for long-distance communication.

Yet, biological observation reveals a completely different reality. When a nerve fiber is stimulated, it does not passively attenuate the signal. Instead, if the stimulus exceeds a certain threshold voltage, the fiber generates a brief, stereotyped electrical pulse. This pulse is called the **action potential**.

The action potential has several remarkable characteristics that defy the logic of a simple passive wire:

1. **Constant Amplitude:** The action potential always peaks at roughly the same voltage, typically around +40 to +50 mV absolute (or ~100-110 mV peak-to-trough from the resting potential). It does not grow smaller as it travels.
2. **Constant Velocity:** The signal propagates along the fiber at a constant speed. Depending on the type of nerve fiber, this speed can range from 1 meter per second in small unmyelinated fibers to over 100 meters per second in large, myelinated motor neurons.
3. **All-or-Nothing Character:** The amplitude and speed of the action potential are entirely independent of the strength of the stimulus that triggered it. A massive electric shock and a barely-above-threshold nudge produce exactly the same action potential. If the stimulus is below threshold, nothing propagates. If it is above threshold, a full, identical pulse is fired.

This observation—a non-decaying, all-or-nothing traveling wave—tells us that the nerve fiber is not a passive cable, but an **active medium**. Energy is being continuously injected into the signal as it travels along the membrane, regenerating the pulse at every point. Our task in this chapter is to explain precisely how this active regeneration works, building the physical and mathematical model formulated by Alan Hodgkin and Andrew Huxley in 1952.

## 2. The Membrane as an Electrical Circuit

To understand the action potential, we must first abstract the biological membrane into a set of physical principles that we can describe mathematically. We are going to treat a small patch of the cell membrane as an electrical circuit.

### Capacitance: The Lipid Bilayer

The cell membrane consists primarily of a lipid bilayer. This is a thin layer of fat, approximately 3 nanometers ($3 \times 10^{-9}$ meters) thick. Lipids are non-polar molecules, meaning they do not possess free charges that can move. Therefore, the lipid bilayer is an electrical insulator (a dielectric).

However, this thin insulator is sandwiched between two highly conducting media: the intracellular fluid (cytoplasm) and the extracellular fluid, both of which are rich in dissolved salts (ions like $Na^+$, $K^+$, $Cl^-$).

In physics, two conducting plates separated by a thin insulator form exactly the geometry of a **capacitor**. A capacitor has the ability to store electrical charge. When positive charges accumulate on one side of the insulator, they repel positive charges (and attract negative charges) on the opposite side.

The capacitance $C$ of a parallel-plate capacitor is given by the formula:
$$C = \frac{\varepsilon_0 \varepsilon_r A}{d}$$
Where:
* $\varepsilon_0 \approx 8.85 \times 10^{-12} \text{ F/m}$ is the vacuum permittivity.
* $\varepsilon_r$ is the relative permittivity (dielectric constant) of the insulating material. For hydrocarbon chains in a lipid bilayer, $\varepsilon_r \approx 2$.
* $A$ is the area of the membrane patch.
* $d$ is the thickness of the insulator.

Let us calculate the specific capacitance $C_m$ (capacitance per unit area, $C/A$) for a biological membrane:
$$C_m = \frac{\varepsilon_0 \varepsilon_r}{d} \approx \frac{(8.85 \times 10^{-12} \text{ F/m}) \times 2}{3 \times 10^{-9} \text{ m}} \approx 0.0059 \text{ F/m}^2$$

In biophysics, we typically use units of microfarads per square centimeter ($\mu\text{F/cm}^2$). Converting the units, we find that the theoretical specific capacitance is roughly $0.6 \text{ to } 1.0 \text{ } \mu\text{F/cm}^2$. This is a staggering match for the experimentally measured capacitance of real biological membranes, which is almost universally $1 \text{ } \mu\text{F/cm}^2$. The membrane is literally a microscopic capacitor.

### Conductance and Resistance: Ion Channels

If the membrane were a perfect capacitor, ions could never cross it, and the cell could never change its voltage. But embedded within this lipid bilayer are specialized protein structures called **ion channels**. These form aqueous pores through which specific ions can flow.

When an ion channel is open, it provides a pathway for electrical current. We characterize this pathway by its **conductance**, denoted by $G$. Conductance is the reciprocal of resistance ($G = 1/R$) and is measured in Siemens (S). The total conductance of the membrane for a specific ion is the sum of the conductances of all the individual open channels for that ion.

By Ohm's Law, the current $I$ flowing through a resistor is given by the voltage difference $V$ multiplied by the conductance $G$:
$$I = G \cdot V$$

However, in a biological cell, the ions are not just moving due to electrical voltage; they are also moving due to chemical concentration gradients. As we saw in Chapter 3, the concentration gradient acts like a battery. The Nernst equation gives us the exact voltage—the equilibrium potential $E_{ion}$—at which the chemical and electrical forces balance out, resulting in zero net current for that ion.

Therefore, the actual driving force pushing an ion across the membrane is not just the absolute membrane voltage $V$, but the difference between the membrane voltage and the ion's equilibrium potential: $(V - E_{ion})$.

The current carried by a specific ion species (for example, Potassium, $K^+$) is thus:
$$I_K = G_K (V - E_K)$$

This equation is a modified Ohm's law. The term $G_K$ represents the ease with which $K^+$ ions can cross the membrane (how many channels are open), and $(V - E_K)$ represents how hard the ions are being pushed (the electrochemical driving force).

### The Equivalent Circuit and Kirchhoff's Law

We can now build our equivalent circuit for a patch of membrane. It consists of:

1. A capacitor $C_m$ representing the lipid bilayer.
2. A set of parallel branches, one for each ion species (typically $Na^+$, $K^+$, and a non-specific "leak" current $L$ primarily representing $Cl^-$ and other minor pathways). Each branch has a variable resistor (the conductance $G_{ion}$) in series with a battery (the Nernst potential $E_{ion}$).

![Action Potential and Ion Conductances](C:/Users/User 1/.gemini/antigravity/brain/398f6bda-2945-4869-bbad-e6bbfabadac2/ch4_action_potential_1785631862009.jpg)

To understand how the voltage across this circuit changes over time, we apply **Kirchhoff's Current Law**, which states that the sum of all currents flowing into a node must equal the sum of all currents flowing out. For an isolated patch of membrane, no charge can vanish. Any current that flows through the ion channels must deposit charge onto the membrane capacitor, changing its voltage.

The current flowing onto a capacitor is proportional to the rate of change of the voltage across it:
$$I_C = C_m \frac{dV}{dt}$$

Here, $\frac{dV}{dt}$ is the derivative of voltage with respect to time. If $dV/dt$ is positive, the voltage is rising (depolarizing). If it is negative, the voltage is falling (repolarizing or hyperpolarizing).

According to Kirchhoff's law, the sum of the capacitive current and the ionic currents must equal any externally injected current $I_{ext}$ (for instance, from a stimulating electrode):
$$I_C + I_{ionic} = I_{ext}$$

Substituting our expressions for the currents, we get the fundamental differential equation governing the membrane potential:
$$C_m \frac{dV}{dt} = I_{ext} - G_{Na}(V - E_{Na}) - G_K(V - E_K) - G_L(V - E_L)$$

If we know the conductances $G_{Na}$, $G_K$, and $G_L$, we can use this equation to predict exactly how the voltage $V$ will change over time. The problem facing Hodgkin and Huxley was that $G_{Na}$ and $G_K$ are not constant. They change depending on the voltage, creating a massively complex, non-linear system.

## 3. The Voltage Clamp Experiment

How do you measure a conductance that changes with voltage, when the act of current flowing through that conductance immediately changes the voltage? It is a circular problem. If you stimulate a nerve, the voltage rapidly swings up and down during an action potential. You cannot isolate the properties of the sodium channels from the potassium channels because they are reacting to each other in real-time.

To break this cycle, Hodgkin and Huxley (along with Bernard Katz and K.S. Cole) developed a revolutionary experimental technique in the late 1940s and early 1950s: the **voltage clamp**.

The voltage clamp uses an electronic feedback circuit to hold the membrane potential $V$ at a fixed, experimenter-determined command voltage, regardless of what the ion channels are doing.

Here is how it works conceptually:
1. An electrode inside the axon measures the actual membrane voltage $V_{m}$.
2. An amplifier compares $V_{m}$ to the desired command voltage $V_{cmd}$.
3. If $V_{m}$ is not equal to $V_{cmd}$, the amplifier instantly injects a current $I_{ext}$ back into the axon to force $V_{m}$ to equal $V_{cmd}$.

The brilliance of this setup lies in the membrane current equation we derived earlier:
$$I_{ext} = C_m \frac{dV}{dt} + I_{ionic}$$

If the feedback circuit successfully clamps the voltage such that $V$ is constant, then the rate of change of voltage $\frac{dV}{dt} = 0$. The capacitive current vanishes. Therefore, the external current injected by the amplifier is exactly equal and opposite to the total ionic current flowing across the membrane:
$$I_{ext} = I_{ionic}$$

By measuring the current their machine had to inject to hold the voltage steady, Hodgkin and Huxley were directly measuring the flow of ions through the membrane at a known, constant voltage.

Furthermore, they needed to separate the total current $I_{ionic}$ into its individual sodium and potassium components. They did this physically by altering the ion concentrations in the bath (removing external sodium), and later experimenters refined this using specific pharmacological blockers:
* **Tetrodotoxin (TTX)**, a deadly poison found in pufferfish, specifically and completely blocks voltage-gated sodium channels. With TTX applied, the voltage clamp only measures the potassium current.
* **Tetraethylammonium (TEA)** specifically blocks voltage-gated potassium channels, allowing measurement of isolated sodium currents.

Through hundreds of meticulous voltage clamp recordings on the giant axon of the squid (chosen because it is large enough—up to 1 mm in diameter—to insert wires down its length), they mapped out exactly how the conductances $G_{Na}$ and $G_K$ behaved over time at various fixed voltages.

## 4. Voltage-Dependent Conductances — The Gating Variables

The voltage clamp experiments revealed two distinct kinetic behaviors for the ion conductances.

**The Potassium Conductance ($G_K$): Delayed Rectification**
When the membrane was stepped from a resting voltage (e.g., -65 mV) to a depolarized voltage (e.g., 0 mV), the potassium conductance $G_K$ did not change instantly. Instead, it rose slowly following an S-shaped (sigmoidal) curve, eventually reaching a new, higher steady-state value. As long as the voltage remained depolarized, $G_K$ remained high. Because it turns on slowly and allows outward current (rectification), it is called a "delayed rectifier."

**The Sodium Conductance ($G_{Na}$): Activation and Inactivation**
The sodium conductance behaved very differently. Upon depolarization, $G_{Na}$ rose extremely rapidly. However, even if the voltage was held constant at the depolarized level, $G_{Na}$ did not stay high. After reaching a peak, it spontaneously fell back down toward zero. The channel turns itself off. This process requires two distinct mechanisms: an **activation** process that opens the channel in response to voltage, and an **inactivation** process that subsequently closes it.

### Mathematical Formulation of Gating

To capture these dynamics, Hodgkin and Huxley modeled the conductances as the product of a maximum possible conductance ($\bar{g}$, achieved if all channels are open) and a set of dimensionless probability variables (between 0 and 1) that describe the fraction of open channels.

They found they could not fit the sigmoidal curves using simple first-order exponential processes. Instead, they had to raise these probability variables to certain powers. They proposed:

$$G_K(t, V) = \bar{g}_K \cdot n^4$$
$$G_{Na}(t, V) = \bar{g}_{Na} \cdot m^3 \cdot h$$

Here, $n$, $m$, and $h$ are **gating variables**:
* $n$ represents the probability that a potassium channel activation particle is in the open state. The power of 4 suggests that four independent identical particles must simultaneously be in the open state for the potassium pore to conduct.
* $m$ represents the sodium activation particle. The power of 3 suggests three identical particles are needed for activation.
* $h$ represents the sodium inactivation particle. The power of 1 suggests a single particle governs inactivation. Notice that $h$ works oppositely to $m$; $h$ represents the probability that the inactivation gate is *not* blocking the channel.

Each gating variable $x \in \{n, m, h\}$ is governed by a first-order kinetic differential equation representing the transition of protein subunits between closed and open states.

Imagine a large population of gating particles. A certain fraction $x$ is in the 'open' state, and the remaining fraction $(1-x)$ is in the 'closed' state.
Transitions from closed to open occur at a rate $\alpha_x(V)$, which depends on the voltage.
Transitions from open to closed occur at a rate $\beta_x(V)$, which also depends on the voltage.

The rate of change of the open fraction, $\frac{dx}{dt}$, is the rate at which closed gates are opening minus the rate at which open gates are closing:

$$\frac{dx}{dt} = \alpha_x(V) (1 - x) - \beta_x(V) x$$

This is the core kinetic equation of the Hodgkin-Huxley model. It represents a physical process: charged protein helices (voltage sensors) moving within the membrane's electric field. Changing the voltage $V$ changes the electrical forces on these sensors, altering the energy barriers between open and closed conformations, and thus changing the transition rates $\alpha$ and $\beta$.

We can rewrite this differential equation into a more intuitive form. Let us find the steady-state value $x_\infty$. At steady state, the derivatives are zero ($\frac{dx}{dt} = 0$):
$$0 = \alpha_x (1 - x_\infty) - \beta_x x_\infty$$
$$x_\infty(V) = \frac{\alpha_x(V)}{\alpha_x(V) + \beta_x(V)}$$

This tells us the final fraction of open gates if the voltage is held constant forever.

We can also define a time constant $\tau_x(V)$ for this process:
$$\tau_x(V) = \frac{1}{\alpha_x(V) + \beta_x(V)}$$

By substituting these definitions back into the kinetic equation, we get the standard exponential decay form:
$$\frac{dx}{dt} = \frac{x_\infty(V) - x}{\tau_x(V)}$$

This form makes the physical meaning clear: the variable $x$ is always trying to approach its steady-state target $x_\infty(V)$, and it does so with a speed determined by the time constant $\tau_x(V)$. When voltage changes, the target $x_\infty$ instantly shifts, and the gate $x$ exponentially decays toward the new target.

## 5. The Full Hodgkin-Huxley Equations

We now possess all the pieces to write down the complete mathematical description of the action potential. The model is a coupled system of four ordinary differential equations (ODEs)—one for the membrane voltage, and three for the gating variables.

**The Membrane Voltage Equation:**
$$C_m \frac{dV}{dt} = I_{ext} - \bar{g}_{Na} m^3 h (V - E_{Na}) - \bar{g}_K n^4 (V - E_K) - \bar{g}_L (V - E_L)$$

**The Kinetic Equations:**
$$\frac{dm}{dt} = \alpha_m(V)(1 - m) - \beta_m(V)m$$
$$\frac{dh}{dt} = \alpha_h(V)(1 - h) - \beta_h(V)h$$
$$\frac{dn}{dt} = \alpha_n(V)(1 - n) - \beta_n(V)n$$

To make this model computable, Hodgkin and Huxley empirically fit algebraic functions to their measured $\alpha$ and $\beta$ rates. The shapes of these functions (exponentials and ratios of exponentials) derive theoretically from Boltzmann statistical mechanics, describing the probability of charged voltage sensors overcoming energy barriers in an electric field.

For the squid giant axon at 6.3°C, with a resting potential convention of roughly -65 mV, the classical empirical rate functions are:

**Sodium Activation ($m$):**
$$\alpha_m(V) = \frac{0.1 (V + 40)}{1 - \exp\left(-\frac{V + 40}{10}\right)}$$
$$\beta_m(V) = 4.0 \exp\left(-\frac{V + 65}{18}\right)$$

**Sodium Inactivation ($h$):**
$$\alpha_h(V) = 0.07 \exp\left(-\frac{V + 65}{20}\right)$$
$$\beta_h(V) = \frac{1}{1 + \exp\left(-\frac{V + 35}{10}\right)}$$

**Potassium Activation ($n$):**
$$\alpha_n(V) = \frac{0.01 (V + 55)}{1 - \exp\left(-\frac{V + 55}{10}\right)}$$
$$\beta_n(V) = 0.125 \exp\left(-\frac{V + 65}{80}\right)$$

**Standard Parameters:**
* Membrane capacitance: $C_m = 1 \text{ } \mu\text{F/cm}^2$
* Max conductances: $\bar{g}_{Na} = 120 \text{ mS/cm}^2$, $\bar{g}_K = 36 \text{ mS/cm}^2$, $\bar{g}_L = 0.3 \text{ mS/cm}^2$
* Reversal potentials: $E_{Na} = +50 \text{ mV}$, $E_K = -77 \text{ mV}$, $E_L = -54.387 \text{ mV}$

This system of equations is deterministic. If you provide an initial voltage and state for the gates, and specify an injected current $I_{ext}(t)$, the mathematics strictly dictate the entire future behavior of the nerve membrane.

## 6. Mechanistic Explanation of the Action Potential

Let us use the Hodgkin-Huxley model to trace exactly what happens during an action potential, translating the mathematics back into biological reality.

**1. The Resting State:**
At rest (no injected current), the membrane sits near -65 mV. At this voltage, the rate equations tell us that $m$ is close to 0 (Na channels closed), $n$ is close to 0 (K channels closed), and $h$ is close to 1 (Na inactivation gates are open, meaning the channels are "ready" to fire, though the activation gates $m$ keep them closed). The primary conductance is the small leak $G_L$, keeping the voltage near $E_L$.

**2. Threshold and The Hodgkin Cycle:**
Suppose a brief external current $I_{ext}$ depolarizes the membrane slightly, pushing it to -55 mV.
Because $\alpha_m(V)$ increases steeply with depolarization, the $m$ gates begin to open rapidly.
As $m$ increases, the sodium conductance $G_{Na} = \bar{g}_{Na}m^3h$ increases.
Because the membrane voltage (-55 mV) is very far from the sodium Nernst potential (+50 mV), there is a massive driving force pushing sodium ions *into* the cell.
This influx of positive sodium ions depolarizes the membrane further.
Further depolarization opens even more $m$ gates, which lets in more sodium, which depolarizes the membrane even faster.

This is a runaway **positive feedback loop** known as the **Hodgkin cycle**. Once the initial depolarization crosses a certain threshold—the point where inward sodium current precisely outpaces outward potassium and leak currents—the cycle becomes self-sustaining. The voltage explodes upward, completely independent of the original stimulus. This explains the "all-or-nothing" nature of the action potential.

**3. Repolarization: The Race Between h and n:**
If only the $m$ gates existed, the voltage would shoot up to $E_{Na}$ (+50 mV) and stay there forever. Why does the action potential come crashing back down after just 1 millisecond? Two separate, slower mechanisms act to terminate the spike.

First, as the voltage becomes highly depolarized, the sodium inactivation gate $h$ begins to close ($h \rightarrow 0$). This cuts off the inward flow of positive charge.
Second, the potassium activation gate $n$ begins to open ($n \rightarrow 1$). The potassium Nernst potential is -77 mV. At a depolarized voltage of +30 mV, there is a massive outward driving force on potassium. Positive charge rapidly floods *out* of the cell.

The combined effect of shutting off the Na+ supply and opening the K+ drain causes the voltage derivative $dV/dt$ to become highly negative. The membrane repolarizes.

**4. The Afterhyperpolarization and Refractory Period:**
The potassium channels ($n$ gates) are slow to open, and they are also slow to close. As the voltage plummets back past the resting potential of -65 mV, the potassium channels remain partially open for a few milliseconds. The membrane potential is pulled strongly toward $E_K$ (-77 mV), resulting in a brief dip below the resting potential called the **afterhyperpolarization**.

During this time, the membrane is in a **refractory period**.
The *absolute refractory period* occurs immediately after the spike when the $h$ gates are almost entirely closed. No matter how much external current you inject, you cannot force the Na channels to open because the inactivation plug is in place. The neuron absolutely cannot fire another spike.
This is followed by the *relative refractory period*, where the $h$ gates are gradually reopening and the $n$ gates are slowly closing. A spike can be fired, but it requires a much stronger stimulus than usual to overcome the lingering outward potassium current. This refractory behavior limits the maximum firing rate of the neuron and, crucially, ensures that action potentials propagate in only one direction.

## 7. Action Potential Propagation: The Cable Equation

So far, our equations describe a single point in space—a uniform patch of membrane. To explain how the signal travels, we must add spatial dimensions. We treat the axon as a cylindrical cable.

When an action potential occurs at point $x=0$, the membrane there becomes highly depolarized (inside positive). At a neighboring point $x=1$ mm, the membrane is still at rest (inside negative). Because there is a voltage difference along the inside of the axon, an electrical current will flow longitudinally down the axoplasm, driven by Ohm's law.

We define the axoplasmic resistance $r_i$ (resistance per unit length of the inner core, units $\Omega/\text{cm}$). We also define the membrane resistance $r_m$ (resistance times length, units $\Omega\cdot\text{cm}$).

If we inject a continuous current at one point in a passive cable (where membrane channels don't change), the voltage decays exponentially with distance:
$$V(x) = V_0 \exp\left(-\frac{x}{\lambda}\right)$$

Where $\lambda$ is the **length constant**, a critical spatial parameter given by:
$$\lambda = \sqrt{\frac{r_m}{r_i}}$$

The length constant dictates how far current can spread down the tube before leaking out. If $r_m$ is high (good insulation) and $r_i$ is low (thick cable), $\lambda$ is large, and signals travel far. In a typical unmyelinated squid axon, $\lambda$ is on the order of 1-2 mm.

During an action potential, the local depolarization causes longitudinal current to flow ahead of the spike. This current depolarizes the *next* segment of the membrane. When that next segment is pushed past the voltage threshold, its sodium channels open, it generates its own Hodgkin cycle, and it fires an action potential. The spike regenerates itself continuously.

The speed at which this propagation occurs depends on how fast the membrane capacitance ahead of the spike can be charged up to threshold. This is governed by two factors:
1. How far ahead the current spreads (governed by the length constant $\lambda$).
2. How quickly the membrane voltage changes in response to that current (governed by the membrane time constant $\tau = r_m C_m$).

Conduction velocity is roughly proportional to $\lambda / \tau$.

**Evolutionary Adaptations for Speed**

To think fast and move fast, animals need high conduction velocities.
Invertebrates like the squid achieved this by increasing $\lambda$ via the denominator $r_i$. Because resistance is inversely proportional to cross-sectional area, making the axon massive (giant axons) decreases internal resistance and increases conduction speed.

Vertebrates evolved a far more elegant solution: **myelination**. Schwann cells and oligodendrocytes wrap axons in thick layers of lipid membrane, vastly increasing the membrane thickness $d$.
Recall our capacitance formula $C_m \propto 1/d$. Myelin drastically decreases the membrane capacitance $C_m$.
Simultaneously, myelin acts as a heavy insulator, plugging the leak channels and drastically increasing the membrane resistance $r_m$.

This combination forces current to spread much further down the axon ($\lambda$ increases) without being wasted charging the membrane capacitor. The action potential jumps rapidly between unmyelinated gaps called Nodes of Ranvier, where the voltage-gated channels are concentrated. This **saltatory conduction** allows a microscopic human nerve fiber to conduct impulses faster than a squid axon a hundred times its diameter.

## 8. Python Code Lab: Simulating the Hodgkin-Huxley Model

We can bring these differential equations to life by solving them numerically. Because they are non-linear, we cannot find a simple algebraic equation $V(t) = ...$ that describes the voltage perfectly. Instead, we step forward in time using a numerical integration technique.

The simplest approach is **Euler's Method**. The definition of a derivative is the slope of the tangent line:
$$\frac{dx}{dt} \approx \frac{\Delta x}{\Delta t}$$

If we know the state of the system $x$ at time $t$, we can calculate the derivative $\frac{dx}{dt}$ right now. We can then approximate the state a tiny time step $\Delta t$ in the future by assuming the slope remains constant over that short window:
$$x(t + \Delta t) \approx x(t) + \frac{dx}{dt} \cdot \Delta t$$

By repeating this process thousands of times with a very small $\Delta t$, we trace out the full trajectory of the action potential.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Model Parameters
C_m  = 1.0      # membrane capacitance, in uF/cm^2
g_Na = 120.0    # max sodium conductance, in mS/cm^2
g_K  = 36.0     # max potassium conductance, in mS/cm^2
g_L  = 0.3      # leak conductance, in mS/cm^2
E_Na = 50.0     # sodium Nernst potential, in mV
E_K  = -77.0    # potassium Nernst potential, in mV
E_L  = -54.387  # leak reversal potential, in mV

# 2. Rate Functions (using the standard -65 mV resting convention)
def alpha_m(V): return 0.1 * (V + 40.0) / (1.0 - np.exp(-(V + 40.0) / 10.0))
def beta_m(V):  return 4.0 * np.exp(-(V + 65.0) / 18.0)

def alpha_h(V): return 0.07 * np.exp(-(V + 65.0) / 20.0)
def beta_h(V):  return 1.0 / (1.0 + np.exp(-(V + 35.0) / 10.0))

def alpha_n(V): return 0.01 * (V + 55.0) / (1.0 - np.exp(-(V + 55.0) / 10.0))
def beta_n(V):  return 0.125 * np.exp(-(V + 65.0) / 80.0)

# 3. Simulation Setup
dt = 0.01         # Time step (ms)
T  = 20.0         # Total simulation time (ms)
time = np.arange(0, T, dt)

# Arrays to store results over time
V = np.zeros(len(time))
m = np.zeros(len(time))
h = np.zeros(len(time))
n = np.zeros(len(time))

# External current injection: 10 uA/cm^2 between t=2 and t=3 ms
I_ext = np.zeros(len(time))
I_ext[(time >= 2.0) & (time <= 3.0)] = 10.0

# Initial Conditions (Resting state)
V[0] = -65.0
m[0] = alpha_m(V[0]) / (alpha_m(V[0]) + beta_m(V[0]))
h[0] = alpha_h(V[0]) / (alpha_h(V[0]) + beta_h(V[0]))
n[0] = alpha_n(V[0]) / (alpha_n(V[0]) + beta_n(V[0]))

# 4. Numerical Integration (Euler's Method)
for i in range(1, len(time)):
    v_old = V[i-1]
    m_old = m[i-1]
    h_old = h[i-1]
    n_old = n[i-1]

    # Calculate ionic currents
    I_Na = g_Na * (m_old**3) * h_old * (v_old - E_Na)
    I_K  = g_K  * (n_old**4) * (v_old - E_K)
    I_L  = g_L  * (v_old - E_L)

    # Differential equations (dV/dt, dm/dt, etc.)
    dVdt = (I_ext[i-1] - I_Na - I_K - I_L) / C_m
    dmdt = alpha_m(v_old)*(1.0 - m_old) - beta_m(v_old)*m_old
    dhdt = alpha_h(v_old)*(1.0 - h_old) - beta_h(v_old)*h_old
    dndt = alpha_n(v_old)*(1.0 - n_old) - beta_n(v_old)*n_old

    # Step forward: x_new = x_old + (dx/dt) * dt
    V[i] = v_old + dVdt * dt
    m[i] = m_old + dmdt * dt
    h[i] = h_old + dhdt * dt
    n[i] = n_old + dndt * dt

# 5. Plotting the Results
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), sharex=True)

ax1.plot(time, V, 'k', linewidth=2)
ax1.set_ylabel('Voltage (mV)', fontsize=11)
ax1.set_title('Hodgkin-Huxley Action Potential', fontsize=12)
ax1.grid(True, alpha=0.3)

ax2.plot(time, m, 'r', label='m (Na activation)')
ax2.plot(time, h, 'g', label='h (Na inactivation)')
ax2.plot(time, n, 'b', label='n (K activation)')
ax2.set_ylabel('Gating Probability', fontsize=11)
ax2.set_xlabel('Time (ms)', fontsize=11)
ax2.grid(True, alpha=0.3)
ax2.legend()

plt.tight_layout()
plt.show()
```

If you run this code and experiment by lowering the injection current in `I_ext` to `4.0` instead of `10.0`, you will observe that only a small bump in voltage occurs, and it rapidly decays. It fails to trigger the Hodgkin cycle. The model correctly captures the threshold behavior of the real neuron.

## 9. Summary and Limitations

The Hodgkin-Huxley model represents one of the crowning achievements of 20th-century biology. By treating the biological membrane as a quantifiable electrical circuit, and mapping the non-linear kinetic behavior of protein ion channels to rigorous differential equations, they proved that macroscopic biological phenomena could be derived precisely from underlying physical chemistry.

We established that:
1. The cell membrane acts as a capacitor in parallel with voltage-dependent variable resistors.
2. Action potentials arise from a runaway positive feedback loop of sodium influx, followed by delayed negative feedback via sodium inactivation and potassium efflux.
3. Propagation relies on the physical spread of current governed by the cable properties of the axon, continuously re-igniting this feedback loop.

**Where the Model Breaks Down**

While foundational, the Hodgkin-Huxley equations are a specific empirical fit to a specific cell (the squid giant axon) at a specific temperature (6.3°C). The model has several critical limitations in modern contexts:

* **Diversity of channels:** Real mammalian neurons do not just have one sodium and one potassium channel. They possess dozens of types of voltage-gated calcium channels, A-type potassium channels, and Hyperpolarization-activated cyclic nucleotide-gated (HCN) channels. These add massive complexity, allowing neurons to burst, adapt, and resonate rhythmically in ways the basic HH model cannot replicate without modification.
* **Macroscopic vs Microscopic:** The model assumes macroscopic, continuous gating variables ($m, h, n$). In reality, ion channels are discrete, stochastic single molecules that flicker open and closed randomly. For very small structures like dendritic spines, the random noise of just one or two channels opening can cause significant voltage fluctuations, requiring stochastic modeling approaches rather than deterministic ODEs.
* **Uniformity:** The simple cable equation assumes a perfectly cylindrical axon. Real neurons branch extensively, have changing diameters, and are studded with spines. Propagation through these complex geometries requires detailed multicompartmental modeling.

Despite these limitations, every modern biophysical simulation of the brain remains, at its core, a generalized extension of the Hodgkin-Huxley formalism. Chapter 5 takes us one level of abstraction lower, asking not how the voltage changes once the gradient exists, but what physical laws govern the random molecular motion of ions that produce the gradients in the first place.
