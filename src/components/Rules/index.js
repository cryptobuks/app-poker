'use strict'

import React from 'react'
import SubtitleBar from '../SubtitleBar'

import './style.css'

const Rules = () => (
  <div className="rules">
    <SubtitleBar text="Regras" />

    <p className="last-update">Atualizado em: 23/maio/2018</p>

    <p><span className="number">1.</span> O torneio será realizado quinzenalmente, a partir do dia 29/09/2016;</p>
    <p><span className="number">2.</span> O buy in do torneio será de R$30,00 (sendo R$20,00 para o torneio do dia e R$10,00 ficando guardado para o pote acumulado), com rebuy ilimitado de R$20,00 até o final do sexto nível;</p>
    <p><span className="number">3.</span> Teremos time chip de 2k fichas para quem chegar até as 21:00hs, após esse horário o jogador receberá stack normal de 8k fichas, independentemente se o torneio já começou ou não;</p>
    <p><span className="number">4.</span> O tempo de blinds será de 20 minutos até o final do sexto nível. Após esse nível os blinds serão de 15 minutos até o final do torneio;</p>
    <p><span className="number">5.</span> Após o término do sexto nível, serão jogadas mais 3 mãos. Ao término desse nível não será permitido mais rebuy, o jogador permanecerá com a quantidade de fichas que terminou o nível; Se na última mão jogada antes do período de rebuy o jogador tiver 2k ou menos fichas poderá realizar o rebuy de 8k fichas;</p>
    <p><span className="number">6.</span> Quando o torneio chegar na fase de HU (um contra um) os blinds irão travar no nível de 1,5k/3k. Caso ocorra desse nível ter sido ultrapassado no momento em que restavam mais de dois jogadores, os blinds correm normalmente. No momento em que restarem apenas dois volta-se para o nível acima descrito;</p>
    <p><span className="number">7.</span> O pote acumulado é uma forma de premiar aqueles que compareceram com frequência e que foram mais regulares durante todas as etapas. Toda etapa será reservado um dinheiro que será adicionado com o das etapas anteriores;</p>
    <p><span className="number">8.</span> O campeão no geral (soma de todas as etapas antes da etapa final) ganhará 50% do valor total do pote acumulado nas etapas anteriores e ganhará seu buy in da etapa de encerramento. Bem como o segundo, terceiro e quarto colocados (G-4) também ganharão seu buy in para o torneio final. Caso sobre algum montante do pote acumulado, esse dinheiro acumulará com a premiação do torneio de encerramento;</p>
    <p><span className="number">9.</span> Para fins de classificação no Ranking fica determinada a seguinte pontuação:
    <br />1º lugar - 100 pontos
    <br />2º lugar - 80 pontos
    <br />3º lugar - 60 pontos
    <br />4º lugar - 50 pontos
    <br />5º lugar - 40 pontos
    <br />6º lugar - 35 pontos
    <br />7º lugar - 30 pontos
    <br />8º lugar - 25 pontos
    <br />9º lugar - 20 pontos
    <br />10º lugar ou menos - 10 pontos por participar
    </p>
    <p><span className="number">10.</span> A estrutura do torneio e os tempos de blinds ficam assim definidos:
    <br />8k iniciais + 2k time chip até as 21hs = R$30,00
    <br />BLINDS: TEMPO:
    <br />50/100 20min
    <br />75/150 20min (40 min de jogo)
    <br />100/200 20min (1 hora de jogo)
    <br />150/300 20min (1 hora e 20min de jogo)
    <br />200/400 20min (1 hora e 40 min de jogo)
    <br />250/500 20min (2 horas de jogo)
    <br />300/600 15min (2 horas e 15min de jogo)
    <br />350/700 15min (2 horas e 30min de jogo)
    <br />400/800 15min (2 horas e 45min de jogo)
    <br />450/900 15min (3 horas de jogo)
    <br />500/1k 15min (3 horas e 15min de jogo)
    <br />750/1,5k 15 min (3 horas e 30min de jogo)
    <br />1k/2k 15min (3 horas e 45min de jogo)
    <br />1,5k/3k 15 min (4 horas de jogo)
    <br />2k/4k 15min (4 horas e 15min de jogo)
    <br />3k/6k 15min (4 horas e 30min de jogo)
    <br />4k/8k 15min (4 horas e 45min de jogo)
    <br />5k/10k 15min (5 horas de jogo)
    <br />6k/12k 15 min (5 horas e 15min de jogo)
    </p>
    <p><span className="number">11.</span> Poker dos Brothers foi criado para fins de interação e disputa entre os amigos. Qualquer ideia nova é bem vinda e poderá ser discutida e votada pela página do facebook, onde sempre prevalecerá a vontade da maioria.</p>

  </div>
)

export default Rules
