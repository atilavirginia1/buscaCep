import React, { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import api from './src/services/api';

export default function App() {

  const[cep, setCep] = useState("");
  const[cidade, setCidade] = useState(null);
  const inputRef = useRef(null);

  async function buscar(){ 
    if(cep === ''){
      alert("Digite um CEP válido!");
      setCep('');
      return;
    }

    try{
      const response = await api.get(`${cep}/json`);
      console.log(response.data);
      setCidade(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log(error)
    }



  }

  function limpar(){
    setCep('');
    setCidade(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 59360000"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
          onPress={ buscar }
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.btnTxt}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={ limpar }
          style={[styles.botao,  { backgroundColor: '#cd3e1d' }]}>
          <Text style={styles.btnTxt}>Limpar</Text>
        </TouchableOpacity>

      </View>

      { cidade && 
            <View style={styles.areaResultado}>
        <Text style={styles.txtResultado}>CEP: {cidade.cep}</Text>
        <Text style={styles.txtResultado}>Logradouro: {cidade.logradouro}</Text>
        <Text style={styles.txtResultado}>Bairro: {cidade.bairro}</Text>
        <Text style={styles.txtResultado}>Cidade: {cidade.localidade}</Text>
        <Text style={styles.txtResultado}>Estado: {cidade.uf}</Text>
      </View>
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },

  areaBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    alignItems: 'center',
  },

  botao: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  btnTxt: {
    fontSize: 22,
    color: '#fff'
  },

  areaResultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  txtResultado: {
    fontSize: 18
  }

});
