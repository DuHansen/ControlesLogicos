module.exports = function(grunt) {
    // Configuração do Grunt
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // Exemplo de tarefa de minificação
      uglify: {
        build: {
          src: 'app.js', // Altere para o caminho correto do seu código
          dest: 'dist/app.min.js'
        }
      }
    });
  
    // Carregar plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
  
    // Registrar a tarefa padrão
    grunt.registerTask('default', ['uglify']); // Adicione suas tarefas aqui
  };
  