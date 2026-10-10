"""
Discovery Institute — First-Principles Science & Biophysics Simulation Runner
Standalone CLI Entrypoint
"""
import sys
import os
import subprocess

def run():
    print("=" * 70)
    print("DISCOVERY INSTITUTE — FIRST-PRINCIPLES SCIENCE CURRICULUM")
    print("Biophysics, Mathematics, Chemistry & Computation")
    print("=" * 70)

    sim_script = os.path.join(os.path.dirname(__file__), "monographs", "simulate_ion_channel.py")
    if os.path.exists(sim_script):
        print(f"\nExecuting Biophysical Ion Channel & Diffusion Simulator...")
        res = subprocess.run([sys.executable, sim_script], cwd=os.path.dirname(sim_script))
        return res.returncode == 0
    else:
        print("\nMonographs and lecture series available in monographs/")
        return True

if __name__ == "__main__":
    success = run()
    sys.exit(0 if success else 1)
