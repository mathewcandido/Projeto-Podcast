import format  from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';



//por conta do modules o react ele não reconhece. então importamos como um arquivo comum  

export default function Header(){
   
    const currentDate = format(new Date(),'EEEEEE,d MMM',{
        locale:ptBR,
    });
   
    return(
        <header className={styles.headerContainer}>
        <img src="/logo.svg" alt="Podcaster" />
        
        <p>O melhor para você ouvir, sempre</p>
        
        <span>{currentDate}</span>

        </header>
        )

}