const form = document.querySelector("form");

function calcularIMC(peso, altura) {
  const imc = peso / Math.pow(altura, 2);
  return parseFloat(imc.toFixed(2));
}

function formatarResposta(resultadoIMC, classificacao) {
  return `Seu IMC é ${resultadoIMC} (${classificacao})`;
}

function enviarRespostaForm() {
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const peso = parseFloat(document.querySelector("#input-peso").value.replace(",", "."));
    const altura = parseFloat(document.querySelector("#input-altura").value.replace(",", "."));
    const resposta = document.querySelector("#resposta");

    if (altura < 0.5 || altura > 2.5 || peso <= 2.0 || peso >= 600.0) {
      resposta.classList.add("error");
      resposta.innerText = "Altura entre (0.5m - 2.5m) e Peso (2.0kg - 600.0kg)";
      return;
    }

    resposta.classList.remove("error");

    const resultado = calcularIMC(peso, altura);

    if (resultado < 18.5) {
      resposta.innerText = formatarResposta(resultado, "Abaixo do peso");
    } else if (resultado >= 18.5 && resultado <= 24.9) {
      resposta.innerText = formatarResposta(resultado, "Peso normal");
    } else if (resultado >= 25.0 && resultado <= 29.9) {
      resposta.innerText = formatarResposta(resultado, "Sobrepeso");
    } else if (resultado >= 30.0 && resultado <= 34.9) {
      resposta.innerText = formatarResposta(resultado, "Obesidade grau 1");
    } else if (resultado >= 35.0 && resultado <= 39.9) {
      resposta.innerText = formatarResposta(resultado, "Obesidade grau 2");
    } else {
      resposta.innerText = formatarResposta(resultado, "Obesidade grau 3");
    }
  });
}

enviarRespostaForm();
