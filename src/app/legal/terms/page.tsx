import React from 'react';
import styles from '../../../styles/Legal.module.scss';

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        
        <div className={styles.section}>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Acceptance of Terms</h2>
          <p className={styles.text}>
            By accessing and using the Catan Map Generator service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Description of Service</h2>
          <p className={styles.text}>
            Catan Map Generator is a web-based tool that allows users to generate random maps for the board game Settlers of Catan and its expansions. The service is provided free of charge and is supported by advertising.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>User Responsibilities</h2>
          <ul className={styles.list}>
            <li>You agree to use the service only for lawful purposes</li>
            <li>You will not attempt to interfere with the proper working of the service</li>
            <li>You will not attempt to bypass any security measures</li>
            <li>You will not use automated systems to access the service excessively</li>
            <li>You acknowledge that Catan is a trademark of Catan GmbH</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Intellectual Property</h2>
          <p className={styles.text}>
            The Catan Map Generator service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className={styles.text}>
            &quot;Catan&quot; and &quot;Settlers of Catan&quot; are trademarks of Catan GmbH. This service is a fan-made tool and is not affiliated with or endorsed by Catan GmbH.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Disclaimer of Warranties</h2>
          <p className={styles.text}>
            The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no representations or warranties of any kind, express or implied, as to the operation of the service or the information, content, materials, or products included on the service.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Limitation of Liability</h2>
          <p className={styles.text}>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Advertising</h2>
          <p className={styles.text}>
            Our service is supported by advertising. By using our service, you agree to the display of advertisements. We use Google AdSense to serve ads, and these ads may be targeted based on your interests and browsing behavior.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Data and Privacy</h2>
          <p className={styles.text}>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Termination</h2>
          <p className={styles.text}>
            We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Changes to Terms</h2>
          <p className={styles.text}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Governing Law</h2>
          <p className={styles.text}>
            These Terms shall be interpreted and governed by the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Contact Information</h2>
          <p className={styles.text}>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className={styles.contact}>
            Email: legal@catanmapgenerator.com
          </p>
        </div>
      </div>
    </div>
  );
}
