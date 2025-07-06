import React from 'react';
import { Layout } from '../../../components/Layout';
import styles from '../../../styles/LegalPage.module.scss';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: July 6, 2025</p>

        <div className={styles.section}>
          <h2 className={styles.heading}>Introduction</h2>
          <p className={styles.text}>
            Welcome to Catan Map Generator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, and protect your information when you use our Catan Map Generator service.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Information We Collect</h2>
          <h3 className={styles.subheading}>Automatically Collected Information</h3>
          <ul className={styles.list}>
            <li>Usage data (pages visited, time spent, interactions)</li>
            <li>Device information (browser type, operating system, screen resolution)</li>
            <li>IP address and general location information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h3 className={styles.subheading}>Information You Provide</h3>
          <ul className={styles.list}>
            <li>Map generation preferences and settings</li>
            <li>Feedback and support communications</li>
            <li>Any information you choose to share when contacting us</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>How We Use Your Information</h2>
          <ul className={styles.list}>
            <li>To provide and improve our map generation service</li>
            <li>To analyze usage patterns and optimize user experience</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Third-Party Services</h2>
          <h3 className={styles.subheading}>Google Analytics</h3>
          <p className={styles.text}>
            We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Data Storage and Security</h2>
          <p className={styles.text}>
            Your map generation data is stored locally in your browser and is not transmitted to our servers. We implement appropriate security measures to protect any information we do collect, but no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Your Rights</h2>
          <p className={styles.text}>
            You have the right to:
          </p>
          <ul className={styles.list}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of certain data collection practices</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Children&apos;s Privacy</h2>
          <p className={styles.text}>
            Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Changes to This Privacy Policy</h2>
          <p className={styles.text}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:luke@lstevens.dev">luke@lstevens.dev</a>.
          </p>
        </div>
        </div>
      </div>
    </Layout>
  );
}
