import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

const Body = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #009bb7;
`;

const BoxTitulo = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: #0a7d9e;
`;

const Titulo = styled.Text`
  font-size: 32px;
  margin-top: 12px;
  color: #FFF;
  font-family: 'Kalam';
`;

const DigitarValor = styled.TextInput`
  width: 90%;
  height: 50px;
  font-size: 18px;
  background-color: rgba(1,1,1,0.4);
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: #fff;
`;

const AreaPorcentagem = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`;

const Botao = styled.TouchableOpacity`
  width: 50%;
  height: 55px;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 10px;
  background-color:  rgba(1,1,1,0.4);
  margin-top: 17px;
  justify-content: center;
  align-items: center;
  margin-right: -5px;
`;

const NomeButton = styled.Text`
  font-size: 23px;
  font-family: 'Dosis-Regular';
  color: #fff; 
`;

const Quadrado = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
`;

const AreaResult = styled.View`
  width: 80%;
  margin-top: 220px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgba(1,1,1,0.5);
  border-radius: 10px;
  border-color: rgba(7,150,222,0.5);
`;

const ResultTitulo = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const ValorResult = styled.Text`
  font-size: 20px;
  margin-bottom: 30px;
  color: #fff;
`;

export default ()=> {
  //state TextInput
  const [ digitar, setDigitar ] = useState("");
  
  //State que vai ter o valor da gorjeta
  const [ valorGojeta, setValorGojeta ] = useState(0);

  //State da porcentagem
  const [ porcentagem, setPorcentagem ] = useState(0)

  //state modal
  const [ modalVisible, setModalVisible ] = useState(false);

  function Resultado(){
    let digitarValor = parseFloat(digitar);
    if(digitarValor) {
      setValorGojeta( (porcentagem/100) * digitarValor);
      setModalVisible(true);
    }    
  }

  useEffect(()=>{
    Resultado();
  },[porcentagem,]);

  return(
    <Body>

      <BoxTitulo>
        <Titulo>Gorjeta</Titulo>
      </BoxTitulo>
     
      <DigitarValor
        placeholder="Informe quanto deu a conta"
        placeholderTextColor="rgba(255,255,255,0.5)"
        keyboardType="numeric"
        value={digitar}
        onChangeText={e=>setDigitar(e)}
      />

      <Botao onPress={Resultado}>
        <NomeButton>Calcular</NomeButton>
      </Botao>

      {digitar > 0 &&

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={()=>setModalVisible(false)}
        >
          <Quadrado>
            <AreaResult>
              <ResultTitulo>Valor da Conta</ResultTitulo>
              <ValorResult>R$ {digitar}</ValorResult>

              <ResultTitulo>Valor da Gorgeta</ResultTitulo>
              <ValorResult>R$ {parseFloat(valorGojeta).toFixed(2)} ({porcentagem}%)</ValorResult>

              <ResultTitulo>Valor Total</ResultTitulo>
              {/* o mais antes do digitar é um operador ternário para transformar a string em number*/}
              <ValorResult>R$ {(+digitar + valorGojeta).toFixed(2)}</ValorResult>
            </AreaResult>

            <AreaPorcentagem>
              <Botao onPress={()=>setPorcentagem(5)}>
                <NomeButton>Calcular 5%</NomeButton>
              </Botao>
              <Botao onPress={()=>setPorcentagem(10)}>
                <NomeButton> Calcular 10%</NomeButton>
              </Botao>
              <Botao onPress={()=>setPorcentagem(15)}>
                <NomeButton>Calcular 15%</NomeButton>
              </Botao>
            </AreaPorcentagem>
          </Quadrado>
        
        </Modal>
       
      }  
      
    </Body>
  );
};