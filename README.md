<div align="center">
  <h3><strong>Zaap</strong></h3>
  No cash. No cards. Just Zaap. Built on Web3. Crafted for your tomorrow.
</div>

<br/>

<p align="center">
  
  <img src="https://img.shields.io/github/last-commit/amanna13/zaap?label=Last%20Commit&logo=git" alt="Last Commit" />
  <img src="https://img.shields.io/badge/Hackathon-purple" alt="Hackathon" />
  <img src="https://img.shields.io/badge/status-Prototype-orange" alt="Status" />
  <img src="https://img.shields.io/badge/version-0.1.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/stability-Prototype-lightgrey" alt="Stability" />
  <br/>
  <img src = "https://img.shields.io/badge/Android-green?logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/-Blockchain-121212?logo=blockchaindotcom&logoColor=white" alt="Blockchain" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" alt="Animated Line" width="90%" />
</p>
</div>


## 📌 Submitted on MetaMask-Card-Dev-Cook-Off

**Built for Track 2: DeFi-Driven Card Utilities** -
Create DeFi tools that boost the utility of card-linked assets. Think allocation, protocol routing, or trustless credit lines. Explore how composable DeFi protocols can power borrowing, repayments, or staking tied directly to card activity.

**Also integrated Metamask DTK and Circle Wallets *(Bonus tracks)***

## Demo & Deliverables
- **Demo Video (Click to watch the youtube video):** - <br>

[![Watch the video](https://img.youtube.com/vi/sL7EbgwUi9M/0.jpg)](https://www.youtube.com/watch?v=sL7EbgwUi9M&pp=ygUVemFhcCBubyBjYXNoIG5vIGNhcmRz)
- **Pitch Deck / PPT Link:** https://www.loom.com/share/c6d53a0bf8c34ac182cd7467cb829208?sid=c67c0044-8307-4b74-a7ab-6b784b6ad043 

---

## 🎯 Objective

**What problem does your project solve, and who does it serve?**  
ZAAP empowers teens to spend digitally using Scan & Pay — no bank account, no KYC, just a delegated Web3 wallet.
Teens enjoy autonomy; parents stay in control with real-time monitoring, wallet linking, and spending limits via a secure dashboard.

**Who It Serves:**
ZAAP serves both teenagers and their guardians by bridging the gap between financial independence and parental oversight. It empowers teens—especially those aged 13 to 19—to make digital payments using a secure, privacy-first solution without the need for a traditional bank account or KYC checks. At the same time, ZAAP equips parents with a powerful web-based dashboard to monitor transactions, set spending limits, and fund their child's wallet. This dual-user approach ensures that while teens gain real-world financial experience, parents maintain visibility and control—creating a safe, modern financial ecosystem built for the next generation.

**Real-World Use Case:**
Meet Aryan, a 16-year-old student in Mumbai. He frequently shops online, pays at local cafés, and subscribes to learning platforms. Traditionally, he'd need to borrow his parent's card or rely on cash — both inconvenient and lacking independence.
With ZAAP, Aryan logs into the mobile app using MetaMask Delegation Toolkit, gaining access to his smart wallet. When he visits a bookstore, he simply scans a QR code/or swipe the metamask card and pays — the transaction is authorized via the linked MetaMask or Circle wallet his parents fund.
On the other side, Aryan's mother uses the ZAAP Parental Dashboard on the web to:
  - Add funds to Aryan's wallet,
  - Set monthly limits,
  - And monitor his spending activity in real-time.

No need for a traditional bank, no KYC hurdles — just seamless, privacy-respecting teen finance.

---

## 🧠 Our Approach
 
### **Why you chose this problem:**
Today’s teens are underserved by traditional financial systems. While they are growing up in a digital world—streaming content, ordering food, and engaging with apps daily—their financial experience is outdated, rigid, and often controlled by legacy banks that require KYC, guardian paperwork, or joint accounts.
There is a growing need for privacy-first, youth-friendly financial tools that strike a balance between freedom for teens and control for parents. Existing solutions either over-restrict or compromise data privacy, making them unfit for modern families.
We believe financial literacy and independence should start early, and ZAAP offers a way to do that without compromising security, privacy, or trust.

### **Key challenges you addressed:**
1. Integrating MetaMask Delegation Toolkit — Setting up secure delegated smart accounts for teens and parents.
2. Hybrid Login Flow — Combining wallet-based and social logins using Web3Auth for seamless onboarding.
3. Zaap CircleLink - Connecting Child Wallet with the Parent wallet with just a QR Scan - as simple as that (check demo for real experience)
4. QR-Based Scan & Pay — Implementing a smooth, real-time scan-and-pay experience for teens on mobile.
5. Parental Monitoring Dashboard — Creating a responsive web dashboard to track and manage child spending.
   
### **Ahhh! Some pivots, brainstorms, or breakthroughs during hacking:**
1. Switched from Traditional Wallets to Smart Accounts — We shifted to MetaMask DTK for flexible, delegated wallet access without compromising control, this also gave us added advantages.
2. Reduction of Gas Fees - As we have used Metamask DTK, we got the advantage, to sponsor gas fees enabling smooth user experience.
3. Brainstormed Dual Experience (Parent + Teen) — Decided to split experiences across mobile (for teens) and web (for parents) to optimize UX per user role.
4. Breakthrough Using Circle & MetaMask Card for Spending — Realized we could route transactions via MetaMask/Circle cards to simulate real-world teen payments.
5. Child and Parent Wallet Connect - We engineered this thing on our own, and it has been a major breakthru. Connecting wallets was never more simpler than this.
6. At first we thought to go with Linea, but then due to some problems/issues from their dev end, we shifted to ethereum.

### ✨ Key Features

Major Highlights of your project:

- ✅ Teen users can scan QR codes and pay directly using circle wallets without needing custody.
- ✅ Parents can log in via MetaMask DTK to fund, monitor, and control their child's wallet and spending.
- ✅ Supports both Web3 social login (via Web3Auth) and MetaMask DTK for secure and flexible access.
- ✅ No KYC required for children; built to ensure financial autonomy while protecting identity.
- ✅ Enables seamless USDC transfers between parent and child wallets using Circle’s developer SDKs.
- ✅ Smart Savings by Child

### Flow of our APP
1. Parent first connect existing Metamask Wallet(Or create a new wallet )
2. Add a new child profile - set nickname, amount to be spend and Done.. 
3. Click on Show QR
4. On the mobile app, first login with your socials, and then you'd be prompted to setup Zaap CircleLink
5. Scan the QR from there, shown on the web dashboard and here you go ... ! 
6. Now you can start Zaaping
7. Scan & Pay, Transfer to wallet addresses, Deposit in wallet, Check your set limits thru your phone, Setup monthly goals and much more unlocked !! 


## 🛠️ Tech Stack

### Core Technologies Used:
- Frontend: Ether Js, React Js, Typescript
- Backend: Solidity, Hardhat, Java, Springboot, Apache Maven, Kotlin, Javascript
- SDK's and Toolkits: Circle SDK, Circle Wallet, Metamask SDK, Metamask Delegation Toolkits, Web3Auth(PlugnPlay) SDKs, New Metamask Embedded Wallets
- Android App using Kotlin/Java
- Hosting: Vercel

### Sponsor Technologies Used (Check Demo Video for more insights):
- [x] **Metamask DTK:** Using the DTK we have created smart accounts, setup Delegations, Delgators and Delegates. Also utilized Web3Auth for social-logins
- [x] **Circle:**  We adopted Circle’s developer-centric programmable wallets and SDKs to enable seamless, secure transfers — from parent to child wallets and further from child to external recipients. This gave us custody control, compliance-ready flows, and scalable wallet orchestration.
      
---
## How it looks (UI Walkthrough)! 

### Zaap Mobile App:

<div align="left", gap = 20px>
    <img src="https://github.com/user-attachments/assets/a1c856a6-a1b5-401e-8173-4f8e3eac15d8" height="400" />
    <img src="https://github.com/user-attachments/assets/0486ac41-c128-4cf5-a383-875efb71265f" height="400" />
  <img src="https://github.com/user-attachments/assets/45a5b366-cf46-4091-ae15-a2cf83150421" height="400" />
  <img src="https://github.com/user-attachments/assets/563e9a21-5f5e-4a04-bec4-c443574aa03c" height="400" />
  <img src="https://github.com/user-attachments/assets/ee69e092-a987-4e47-9fbd-d2e50da09dfa" height="400" />
  <img src="https://github.com/user-attachments/assets/937da339-e5ae-45a9-a1c0-b62e4b45d05e" height="400" />
    <img src="https://github.com/user-attachments/assets/c7e46c6b-7693-4ce7-9c25-8304b2c6c563" height="400" />
</div>

### Parental Portal:
<div align="left", gap = 30px>
<img width="600" alt="image" src="https://github.com/user-attachments/assets/8f6764b0-1ffc-4333-b9aa-663164a3d8cb" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/b6fa038b-7557-4503-a67a-9dfd588b5acf" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/86bb86ed-aee9-41d1-a7a5-77d3927c4b19" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/2695cf98-ddb5-48f3-bac5-a4d63d866821" />
</div>

---

## 🧪 How to Run the Project Locally

### Requirements:
- Node.js / Python / Docker / etc.
- API Keys (if any)
- .env file setup (if needed)

### Local Setup:
```bash
# Clone the repo
git clone [https://github.com/amanna13/Lumos.git](https://github.com/amanna13/Zaap.git)


# Install dependencies
## For Web
cd Zaap-Web
cd zapp-frontend
npm install
npm run dev

cd zaap-backend
npm install
npm run dev

#Both Frontend and Backend both are deployed on vercel:
Frontend: https://zaap-eight.vercel.app/
Backend: https://zaap-backend.vercel.app/

#API Endpoint:
POST - /api/connect-child
POST - /api/set-delegator

```

### For Android App -
```bash
# Clone the repo Zaap-Android
# Build the project using Gradle
```

---

<details>
  <summary><strong>📎 Resources / Docs / Credits</strong></summary>

  - [Circle](https://www.circle.com) – Payments and stablecoin infrastructure  
  - [MetaMask](https://metamask.io/) – Ethereum wallet & gateway  
  - [Web3Auth](https://web3auth.io/) – Key management infrastructure for Web3 apps

</details>


## 🏁 Final Words

Zaap isn’t just a product — it’s a movement toward redefining financial freedom for the next generation. By blending the power of Web3 with privacy-first design, Zaap empowers teens to spend responsibly while giving parents smart, seamless control. In a world where digital finance is evolving fast, Zaap bridges the gap between trust, technology, and teen independence.
**No cash. No cards. Just Zaap.**

---

### Team Members:  

<table align="left">
  <tr>
    <td><img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/7bb1e704-6026-48f9-8435-2f4d40101348" width="50"></td>
    <td><h4>Built by the Zaap Squad</h4></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <table>
        <tr>
          <td align="center">
            <a href="https://github.com/amanna13">
              <img src="https://github.com/amanna13.png" width="80" height="80"><br>
              <sub><b>@amanna13</b></sub>
            </a>
          </td>
          <td align="center">
            <a href="https://github.com/amitrajeet7635">
              <img src="https://github.com/amitrajeet7635.png" width="80" height="80"><br>
              <sub><b>@amitrajeet7635</b></sub>
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>




