import styles from "./AppLayout.module.css"

export default function AppLayout({children}){
    return(
        <div className={styles.layout}>
            {children}
        </div>
    )
}