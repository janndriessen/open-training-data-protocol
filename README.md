# Open Training Data Protocol
Submission for ETHGlobal Cannes 2025

The Open Training Data Protocol (OTDP) is a lightweight, open standard designed to store and exchange training activity data recorded by devices during sports such as swimming, cycling, running, and more.

OTDP aims to break this lock-in by liberating training data—empowering athletes, coaches, and developers to store, transfer, and utilize their data independently of proprietary platforms.

By owning your training data, you unlock powerful possibilities:

* Proof of Training: Use your verified activity records for innovative applications like performance-based NFTs, challenge verification, or coaching validation.
* Interoperability: Seamlessly migrate your training history between platforms and apps, allowing you to use your preferred user interface and services without losing data.
* Personal Privacy Control: Define your own privacy rules—whether you want to keep your data private, share it selectively, or make it fully public.
* Advanced Personal Analytics: Run custom analysis or integrate your data with specialized tools for deeper insights into your training, progress, and performance.
* Anonymous Data Sharing for Research (Future Use Case): Contribute your anonymized training data to scientific or community research projects, helping to advance fields like sports science, health studies, and urban planning—while maintaining full control and anonymity.

## Tech

The proof of concept (PoC) web app for the Open Training Data Protocol was primarily built with Next.js (TypeScript), using shadcn for the user interface and `Privy` for account management.

For storage, `Walrus` was chosen as the solution for file storage, while `Zircuit` served as the main network to store onchain metadata.

## Setup

For setting up the individual parts please see the README's in the /app and /contract folders.
