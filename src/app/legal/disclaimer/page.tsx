import React from 'react';
import styles from '../../../styles/Legal.module.scss';

export default function Disclaimer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Disclaimer</h1>
        
        <div className={styles.section}>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>General Disclaimer</h2>
          <p className={styles.text}>
            The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this Company:
          </p>
          <ul className={styles.list}>
            <li>Excludes all representations and warranties relating to this website and its contents</li>
            <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Trademark Disclaimer</h2>
          <p className={styles.text}>
            &quot;Catan,&quot; &quot;Settlers of Catan,&quot; &quot;Seafarers,&quot; &quot;Cities &amp; Knights,&quot; &quot;Traders &amp; Barbarians,&quot; &quot;Explorers &amp; Pirates,&quot; and all related names, marks, logos, and images are trademarks of Catan GmbH.
          </p>
          <p className={styles.text}>
            This website is a fan-made tool and is not affiliated with, endorsed by, or sponsored by Catan GmbH. The use of these trademarks is purely for identification and reference purposes under fair use.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Service Availability</h2>
          <p className={styles.text}>
            We make no warranty that the service will be available at any particular time or location. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Third-Party Content</h2>
          <p className={styles.text}>
            This website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Game Rules and Accuracy</h2>
          <p className={styles.text}>
            While we strive to ensure that the map generation follows official Catan rules and guidelines, we make no warranty as to the accuracy, completeness, or balance of generated maps. Users should verify map setups according to official game rules.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Technical Limitations</h2>
          <p className={styles.text}>
            The service depends on web browser capabilities and internet connectivity. We cannot guarantee compatibility with all browsers, devices, or network configurations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>User-Generated Content</h2>
          <p className={styles.text}>
            Any feedback, suggestions, or other information you provide to us may be used by us without restriction. We are not responsible for any content you may generate using our service.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Contact Information</h2>
          <p className={styles.text}>
            If you have any questions about this disclaimer, please contact us at:
          </p>
          <p className={styles.contact}>
            Email: info@catanmapgenerator.com
          </p>
        </div>
      </div>
    </div>
  );
}
