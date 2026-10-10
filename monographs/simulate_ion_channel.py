import numpy as np
import matplotlib.pyplot as plt

# Physical Constants
e0 = 8.854e-12       # Permittivity of vacuum (F/m)
q = 1.602e-19        # Elementary charge (C)
NA = 6.022e23        # Avogadro's number
r_O = 1.40           # Oxygen ionic radius (Angstroms)
r_K = 1.33           # Potassium ionic radius (Angstroms)
r_Na = 0.95          # Sodium ionic radius (Angstroms)

# Dehydration energies (experimental / Born model in kJ/mol)
dG_dehyd_K = 295.0   # kJ/mol
dG_dehyd_Na = 405.0  # kJ/mol

# Effective charge of carbonyl oxygen (partial charge)
q_O = -0.55 * q      # Coulomb charge

def coordination_energy(r_ion, pore_radius, n_oxygens=8):
    """
    Computes electrostatic interaction energy (kJ/mol) between ion and n_oxygens
    at a given pore radius.
    """
    d_meters = max(pore_radius, r_ion + r_O) * 1e-10 
    E_coulomb_joules = n_oxygens * (q * q_O) / (4 * np.pi * e0 * d_meters)
    E_coulomb_kj = (E_coulomb_joules * NA) / 1000.0
    return E_coulomb_kj

radii = np.linspace(2.0, 3.5, 300)

net_G_K = []
net_G_Na = []

for r_pore in radii:
    E_coord_K = coordination_energy(r_K, r_pore)
    G_K = dG_dehyd_K + E_coord_K
    net_G_K.append(G_K)
    
    eff_r_pore = max(r_pore, 2.73)  # Rigid protein backbone constraint
    E_coord_Na = coordination_energy(r_Na, eff_r_pore)
    G_Na = dG_dehyd_Na + E_coord_Na
    net_G_Na.append(G_Na)

plt.figure(figsize=(10, 6), dpi=120)
plt.plot(radii, net_G_K, label="$K^+$ Net Free Energy ($\Delta G$)", color="#8b5cf6", linewidth=2.5)
plt.plot(radii, net_G_Na, label="$Na^+$ Net Free Energy ($\Delta G$)", color="#3b82f6", linewidth=2.5)
plt.axvline(x=r_K + r_O, color="#10b981", linestyle="--", label=f"Optimal $K^+$ Pore Radius ({r_K + r_O:.2f} Å)")

plt.title("Ion Channel Selectivity: Free Energy Barrier vs. Pore Radius", fontsize=14, fontweight="bold")
plt.xlabel("Pore Coordination Radius (Å)", fontsize=12)
plt.ylabel("Net Free Energy $\Delta G$ (kJ/mol)", fontsize=12)
plt.axhline(0, color="gray", linestyle=":", alpha=0.7)
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.ylim(-50, 150)
plt.tight_layout()
output_path = r"C:\Users\User 1\.gemini\antigravity\brain\398f6bda-2945-4869-bbad-e6bbfabadac2\ion_channel_selectivity_plot.png"
plt.savefig(output_path)
print(f"Successfully generated plot at: {output_path}")
