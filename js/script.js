// Inicializar EmailJS
console.log("Iniciando EmailJS...");
emailjs.init("ZGXsp7eHmd-iCQSNW");
console.log("EmailJS inicializado!");

const form = document.getElementById("contatoForm");

if (!form) {
    console.error("Formulário não encontrado!");
} else {
    console.log("Formulário encontrado!");
}

form.addEventListener("submit", function (e) {
    console.log("Formulário submetido!");
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.innerText = "Enviando...";

    // Capturar os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const objetivo = document.getElementById("objetivo").value.trim();

    // Validação básica
    if (!nome || !telefone || !objetivo) {
        btn.innerText = "Enviar";
        alert("Por favor, preencha todos os campos");
        return;
    }

    // Enviar email com template correto
    emailjs.send(
        "service_87jbdjn",
        "template_i94lilf",
        {
            to_email: "contatoteambispo@gmail.com",
            name: nome,
            email: "contatoteambispo@gmail.com",
            phone: telefone,
            message: objetivo
        }
    )
        .then((response) => {
            console.log("Email enviado com sucesso:", response);
            btn.innerText = "Enviado ✓";
            alert("Mensagem enviada com sucesso!");
            form.reset();

            // Resetar o botão após 3 segundos
            setTimeout(() => {
                btn.innerText = "Enviar";
            }, 3000);
        })
        .catch((error) => {
            console.error("Erro ao enviar email:", error);
            btn.innerText = "Enviar";
            alert("Erro ao enviar: " + error.text);
        });
});