import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Banner 
      image="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/frFR/Images/originals-ss22-parley-launch-hp-mh-large-1-group-d_tcm196-854466.jpg"
      title="LES ICÔNES D'AUJOURD'HUI, REPENSÉES POUR DEMAIN"
      paragraphe="Voici notre nouvelle collection d'icônes, conçues en partie à base de Parley Ocean Plastic."
      ></Banner>
    </div>
  )
}
