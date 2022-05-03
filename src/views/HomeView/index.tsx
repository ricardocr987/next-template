import styles from '../../styles/views/Home.module.css'
import { About } from './About'
import { MyNFTs } from './MyNFTs'

export const HomeView = () => {
    return(
        <>
            <div className={styles.home_container}>
                <div className={styles.home_background}>
                    <video className={styles.video_background} autoPlay loop muted>
                        <source src={'/video.mp4'} type="video/mp4" />
                    </video>            
                </div>
                <div className={styles.home_content}>
                    <h1 className={styles.home_title}>
                        TITLE
                    </h1>
                    <p className={styles.home_ubtitle}>
                        Subtitle
                    </p>
                </div>
            </div>
            <About/>
            <MyNFTs/>
        </>
    )
}