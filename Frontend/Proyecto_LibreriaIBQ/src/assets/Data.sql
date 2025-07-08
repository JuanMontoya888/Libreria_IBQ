use libreria_ibq;

INSERT INTO categories (user_id, username, category_name) VALUES
(350176, '350176', 'Artículo'),
(350176, '350176', 'Libro'),
(350176, '350176', 'Informe'),
(350176, '350176', 'Manual Técnico'),
(350176, '350176', 'Tesis');

INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Artículo', 1, 'IA_aplicada_salud.pdf', '/uploads/jhernandez/IA_aplicada_salud.pdf', 'application/word', '2025-05-10 10:24:00'),
(350176, '350176', 'Libro', 2, 'Bases_de_datos_distribuidas.epub', '/uploads/mperez/Bases_de_datos_distribuidas.epub', 'application/zip', '2025-03-12 14:50:00'),
(350176, '350176', 'Informe', 3, 'informe_anual_energia2024.docx', '/uploads/aluna/informe_anual_energia2024.docx', 'application/word', '2025-01-20 08:10:00'),
(350176, '350176', 'Manual Técnico', 4, 'Guia_configuracion_Linux.pdf', '/uploads/jhernandez/Guia_configuracion_Linux.pdf', 'application/pdf', '2025-06-01 13:30:00'),
(350176, '350176', 'Artículo', 1, 'Blockchain_y_gobiernos.pdf', '/uploads/cortega/Blockchain_y_gobiernos.pdf', 'application/pdf', '2025-02-18 09:22:00'),
(350176, '350176', 'Libro', 2, 'Fundamentos_redes_modernas.pdf', '/uploads/dvaldez/Fundamentos_redes_modernas.pdf', 'application/pdf', '2025-01-03 07:15:00'),
(350176, '350176', 'Artículo', 1, 'Tecnologias_5G_en_America.pdf', '/uploads/lfuentes/Tecnologias_5G_en_America.pdf', 'application/pdf', '2025-05-14 12:42:00'),
(350176, '350176', 'Tesis', 5, 'tesis_vision_computacional.pdf', '/uploads/arodriguez/tesis_vision_computacional.pdf', 'application/pdf', '2025-04-10 11:55:00'),
(350176, '350176', 'Manual Técnico', 4, 'docker_kubernetes_manual.docx', '/uploads/mperez/docker_kubernetes_manual.docx', 'application/zip', '2025-03-15 16:00:00'),
(350176, '350176', 'Libro', 2, 'Diseño_de_algoritmos_eficientes.epub', '/uploads/ncastro/Diseño_de_algoritmos_eficientes.epub', 'application/zip', '2025-02-08 10:33:00'),
(350176, '350176', 'Informe', 3, 'reporte_ciberseguridad_2024.pdf', '/uploads/aluna/reporte_ciberseguridad_2024.pdf', 'application/pdf', '2025-01-15 18:25:00'),
(350176, '350176', 'Artículo', 1, 'mineria_datos_en_educacion.pdf', '/uploads/rgarcia/mineria_datos_en_educacion.pdf', 'application/pdf', '2025-06-05 08:45:00'),
(350176, '350176', 'Libro', 2, 'Robotica_y_automatizacion.epub', '/uploads/emartinez/Robotica_y_automatizacion.epub', 'application/zip', '2025-05-30 17:00:00'),
(350176, '350176', 'Informe', 3, 'analisis_trafico_red_2024.xlsx', '/uploads/lfuentes/analisis_trafico_red_2024.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '2025-06-15 09:20:00'),
(350176, '350176', 'Artículo', 1, 'privacidad_digital_sigloXXI.pdf', '/uploads/agonzalez/privacidad_digital_sigloXXI.pdf', 'application/pdf', '2025-06-20 13:05:00'),
(350176, '350176', 'Manual Técnico', 4, 'Programacion_embebida_ESP32.pdf', '/uploads/cortega/Programacion_embebida_ESP32.pdf', 'application/pdf', '2025-04-08 15:12:00'),
(350176, '350176', 'Tesis', 5, 'tesis_sistemas_distribuidos.pdf', '/uploads/bsolis/tesis_sistemas_distribuidos.pdf', 'application/pdf', '2025-03-01 10:45:00'),
(350176, '350176', 'Libro', 2, 'Introduccion_computacion_cuantica.epub', '/uploads/ymorales/Introduccion_computacion_cuantica.epub', 'application/zip', '2025-01-28 12:10:00'),
(350176, '350176', 'Informe', 3, 'balance_proyecto_sistemas_2024.docx', '/uploads/rgarcia/balance_proyecto_sistemas_2024.docx', 'application/word', '2025-02-20 09:55:00'),
(350176, '350176', 'Manual Técnico', 4, 'api_rest_segura_nodejs.pdf', '/uploads/arodriguez/api_rest_segura_nodejs.pdf', 'application/pdf', '2025-05-03 11:30:00'),
(350176, '350176', 'Artículo', 1, 'sistemas_autoadaptativos.pdf', '/uploads/vrios/sistemas_autoadaptativos.pdf', 'application/pdf', '2025-04-25 16:40:00'),
(350176, '350176', 'Libro', 2, 'ciencia_de_datos_para_ingenieros.pdf', '/uploads/agonzalez/ciencia_de_datos_para_ingenieros.pdf', 'application/pdf', '2025-03-11 10:20:00'),
(350176, '350176', 'Tesis', 5, 'tesis_IA_en_sistemas_criticos.pdf', '/uploads/ppalacios/tesis_IA_en_sistemas_criticos.pdf', 'application/pdf', '2025-02-14 14:30:00'),
(350176, '350176', 'Informe', 3, 'evaluacion_algoritmos_predictivos.docx', '/uploads/ppalacios/evaluacion_algoritmos_predictivos.docx', 'application/word', '2025-01-07 07:30:00'),
(350176, '350176', 'Manual Técnico', 4, 'devops_practicas_continuas.pdf', '/uploads/rjimenez/devops_practicas_continuas.pdf', 'application/pdf', '2025-06-25 18:50:00');


-- Artículos
INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Artículo', 1, 'computacion_verde.pdf', '/uploads/jrios/computacion_verde.pdf', 'application/pdf', '2025-01-10 10:15:00'),
(350176, '350176', 'Artículo', 1, 'etica_en_la_IA.pdf', '/uploads/mgomez/etica_en_la_IA.pdf', 'application/pdf', '2025-01-15 11:20:00'),
(350176, '350176', 'Artículo', 1, 'machine_learning_industria.pdf', '/uploads/agonzalez/machine_learning_industria.pdf', 'application/pdf', '2025-01-20 14:00:00'),
(350176, '350176', 'Artículo', 1, 'realidad_aumentada_educacion.pdf', '/uploads/jperez/realidad_aumentada_educacion.pdf', 'application/pdf', '2025-01-25 16:10:00'),
(350176, '350176', 'Artículo', 1, 'vision_computacional_medicina.pdf', '/uploads/aluna/vision_computacional_medicina.pdf', 'application/pdf', '2025-02-01 09:30:00'),
(350176, '350176', 'Artículo', 1, 'robotica_colaborativa.pdf', '/uploads/jmartinez/robotica_colaborativa.pdf', 'application/pdf', '2025-02-05 10:45:00'),
(350176, '350176', 'Artículo', 1, 'analisis_sentimientos_rrss.pdf', '/uploads/ymorales/analisis_sentimientos_rrss.pdf', 'application/pdf', '2025-02-10 12:00:00'),
(350176, '350176', 'Artículo', 1, 'sistemas_autonomos_transporte.pdf', '/uploads/vrios/sistemas_autonomos_transporte.pdf', 'application/pdf', '2025-02-15 08:55:00'),
(350176, '350176', 'Artículo', 1, 'aplicaciones_de_drones.pdf', '/uploads/nramirez/aplicaciones_de_drones.pdf', 'application/pdf', '2025-02-18 13:15:00'),
(350176, '350176', 'Artículo', 1, 'tecnologias_sostenibles_2025.pdf', '/uploads/arodriguez/tecnologias_sostenibles_2025.pdf', 'application/pdf', '2025-02-20 17:40:00');

-- Libros
INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Libro', 2, 'fundamentos_de_ciberseguridad.epub', '/uploads/jhernandez/fundamentos_de_ciberseguridad.epub', 'application/zip', '2025-03-01 10:30:00'),
(350176, '350176', 'Libro', 2, 'introduccion_a_la_programacion.pdf', '/uploads/cortega/introduccion_a_la_programacion.pdf', 'application/pdf', '2025-03-03 14:20:00'),
(350176, '350176', 'Libro', 2, 'algoritmos_y_complejidad.epub', '/uploads/mperez/algoritmos_y_complejidad.epub', 'application/zip', '2025-03-06 09:45:00'),
(350176, '350176', 'Libro', 2, 'diseño_de_base_de_datos.pdf', '/uploads/dvaldez/diseño_de_base_de_datos.pdf', 'application/pdf', '2025-03-09 13:30:00'),
(350176, '350176', 'Libro', 2, 'desarrollo_de_software_agil.epub', '/uploads/rjimenez/desarrollo_de_software_agil.epub', 'application/zip', '2025-03-12 10:10:00'),
(350176, '350176', 'Libro', 2, 'compiladores_modernos.pdf', '/uploads/ppalacios/compiladores_modernos.pdf', 'application/pdf', '2025-03-14 16:00:00'),
(350176, '350176', 'Libro', 2, 'redes_de_computadoras.epub', '/uploads/agonzalez/redes_de_computadoras.epub', 'application/zip', '2025-03-18 11:35:00'),
(350176, '350176', 'Libro', 2, 'arquitectura_de_computadoras.pdf', '/uploads/bsolis/arquitectura_de_computadoras.pdf', 'application/pdf', '2025-03-20 08:25:00'),
(350176, '350176', 'Libro', 2, 'ingenieria_de_requisitos.epub', '/uploads/emartinez/ingenieria_de_requisitos.epub', 'application/zip', '2025-03-23 15:50:00'),
(350176, '350176', 'Libro', 2, 'ciencia_de_datos_y_IA.pdf', '/uploads/lfuentes/ciencia_de_datos_y_IA.pdf', 'application/pdf', '2025-03-26 09:05:00');

-- Informes
INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Informe', 3, 'reporte_financiero_T1_2025.docx', '/uploads/ymorales/reporte_financiero_T1_2025.docx', 'application/word', '2025-04-01 10:00:00'),
(350176, '350176', 'Informe', 3, 'informe_proyecto_redes.pdf', '/uploads/jlopez/informe_proyecto_redes.pdf', 'application/pdf', '2025-04-03 11:30:00'),
(350176, '350176', 'Informe', 3, 'estadisticas_mensuales_energia.xlsx', '/uploads/csalinas/estadisticas_mensuales_energia.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '2025-04-05 09:45:00'),
(350176, '350176', 'Informe', 3, 'evaluacion_sistemas_2025.docx', '/uploads/jtorres/evaluacion_sistemas_2025.docx', 'application/word', '2025-04-08 08:10:00'),
(350176, '350176', 'Informe', 3, 'informe_auditoria_TI.pdf', '/uploads/mvaldez/informe_auditoria_TI.pdf', 'application/pdf', '2025-04-10 13:55:00'),
(350176, '350176', 'Informe', 3, 'avance_proyecto_datawarehouse.pdf', '/uploads/jhernandez/avance_proyecto_datawarehouse.pdf', 'application/pdf', '2025-04-13 10:20:00'),
(350176, '350176', 'Informe', 3, 'reporte_tecnico_servidores.docx', '/uploads/fcamacho/reporte_tecnico_servidores.docx', 'application/word', '2025-04-15 14:00:00'),
(350176, '350176', 'Informe', 3, 'monitoreo_infraestructura_cloud.xlsx', '/uploads/vrios/monitoreo_infraestructura_cloud.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '2025-04-17 16:35:00'),
(350176, '350176', 'Informe', 3, 'analisis_impacto_ciberataques.pdf', '/uploads/ncastro/analisis_impacto_ciberataques.pdf', 'application/pdf', '2025-04-19 15:20:00'),
(350176, '350176', 'Informe', 3, 'resumen_resultados_IA_2025.pdf', '/uploads/dcarvajal/resumen_resultados_IA_2025.pdf', 'application/pdf', '2025-04-21 12:10:00');

-- Manual Técnico
INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Manual Técnico', 4, 'manual_nodejs_2025.pdf', '/uploads/jrios/manual_nodejs_2025.pdf', 'application/pdf', '2025-05-01 10:00:00'),
(350176, '350176', 'Manual Técnico', 4, 'guia_uso_kafka.pdf', '/uploads/aluna/guia_uso_kafka.pdf', 'application/pdf', '2025-05-03 11:30:00'),
(350176, '350176', 'Manual Técnico', 4, 'manual_configuracion_docker.pdf', '/uploads/mperez/manual_configuracion_docker.pdf', 'application/pdf', '2025-05-05 14:15:00'),
(350176, '350176', 'Manual Técnico', 4, 'documentacion_rest_api.docx', '/uploads/jmartinez/documentacion_rest_api.docx', 'application/word', '2025-05-07 15:45:00'),
(350176, '350176', 'Manual Técnico', 4, 'manual_admin_linux.pdf', '/uploads/cortega/manual_admin_linux.pdf', 'application/pdf', '2025-05-09 08:20:00'),
(350176, '350176', 'Manual Técnico', 4, 'guia_microsistemas_avanzados.pdf', '/uploads/jhernandez/guia_microsistemas_avanzados.pdf', 'application/pdf', '2025-05-11 13:05:00'),
(350176, '350176', 'Manual Técnico', 4, 'manual_virtualizacion.docx', '/uploads/arodriguez/manual_virtualizacion.docx', 'application/word', '2025-05-13 09:00:00'),
(350176, '350176', 'Manual Técnico', 4, 'manual_seguridad_informatica.pdf', '/uploads/rgarcia/manual_seguridad_informatica.pdf', 'application/pdf', '2025-05-15 17:25:00'),
(350176, '350176', 'Manual Técnico', 4, 'documentacion_automatizacion.pdf', '/uploads/nramirez/documentacion_automatizacion.pdf', 'application/pdf', '2025-05-17 11:10:00'),
(350176, '350176', 'Manual Técnico', 4, 'guia_de_despliegue_k8s.pdf', '/uploads/bsolis/guia_de_despliegue_k8s.pdf', 'application/pdf', '2025-05-19 10:30:00');

-- Tesis
INSERT INTO documents (user_id, username, file_category, id_category, file_name, file_path, file_type, uploaded_at) VALUES
(350176, '350176', 'Tesis', 5, 'tesis_reconocimiento_facial_2025.pdf', '/uploads/lfuentes/tesis_reconocimiento_facial_2025.pdf', 'application/pdf', '2025-06-01 09:45:00'),
(350176, '350176', 'Tesis', 5, 'tesis_robotica_movil_2025.pdf', '/uploads/jramirez/tesis_robotica_movil_2025.pdf', 'application/pdf', '2025-06-03 14:15:00'),
(350176, '350176', 'Tesis', 5, 'tesis_aprendizaje_profundo_2025.pdf', '/uploads/emartinez/tesis_aprendizaje_profundo_2025.pdf', 'application/pdf', '2025-06-05 11:00:00'),
(350176, '350176', 'Tesis', 5, 'tesis_sistemas_embebidos_2025.pdf', '/uploads/ppalacios/tesis_sistemas_embebidos_2025.pdf', 'application/pdf', '2025-06-07 13:30:00'),
(350176, '350176', 'Tesis', 5, 'tesis_ciberseguridad_industrial.pdf', '/uploads/agonzalez/tesis_ciberseguridad_industrial.pdf', 'application/pdf', '2025-06-09 16:00:00'),
(350176, '350176', 'Tesis', 5, 'tesis_vision_computacional_2025.pdf', '/uploads/arodriguez/tesis_vision_computacional_2025.pdf', 'application/pdf', '2025-06-11 10:10:00'),
(350176, '350176', 'Tesis', 5, 'tesis_computacion_cuantica_2025.pdf', '/uploads/vrios/tesis_computacion_cuantica_2025.pdf', 'application/pdf', '2025-06-13 08:55:00'),
(350176, '350176', 'Tesis', 5, 'tesis_interfaces_hombre_maquina.pdf', '/uploads/mvaldez/tesis_interfaces_hombre_maquina.pdf', 'application/pdf', '2025-06-15 12:20:00'),
(350176, '350176', 'Tesis', 5, 'tesis_automatizacion_industrial.pdf', '/uploads/ymorales/tesis_automatizacion_industrial.pdf', 'application/pdf', '2025-06-17 17:45:00'),
(350176, '350176', 'Tesis', 5, 'tesis_desarrollo_web_moderno.pdf', '/uploads/jlopez/tesis_desarrollo_web_moderno.pdf', 'application/pdf', '2025-06-20 14:35:00');
