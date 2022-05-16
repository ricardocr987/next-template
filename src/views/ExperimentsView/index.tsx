import styles from "../../styles/views/Experiments.module.css";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export const ExperimentsView = () => {
  return (
    <>
      <div className={styles.experiments_container}>
        <div className={styles.experiments_background}>
            <div className={styles.experiments_content}>
                <Link href={'/experiments/NFTDetector'}>
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 500,
                            flexGrow: 1,
                            cursor: "pointer"
                        }}
                    >
                        <Grid item xs={12} sm container spacing={2}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                <Typography gutterBottom variant="h5" component="div">
                                    NFTs detector and banner generator
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Detects the NFTs from the connected wallet and gives you options to include it in a twitter banner
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
};
