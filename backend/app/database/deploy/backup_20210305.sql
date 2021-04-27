PGDMP     0    *                y            moovybox    12.3    12.3 4    `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            c           1262    16394    moovybox    DATABASE     �   CREATE DATABASE moovybox WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_France.1252' LC_CTYPE = 'French_France.1252';
    DROP DATABASE moovybox;
                moovyboxuser    false            �            1259    16430    box    TABLE     F  CREATE TABLE public.box (
    id integer NOT NULL,
    code text NOT NULL,
    label text NOT NULL,
    destination_room text NOT NULL,
    fragile boolean DEFAULT false NOT NULL,
    heavy boolean DEFAULT false NOT NULL,
    floor boolean DEFAULT false NOT NULL,
    user_id integer NOT NULL,
    move_id integer NOT NULL
);
    DROP TABLE public.box;
       public         heap    moovyboxuser    false            �            1259    16453    box_code_seq    SEQUENCE     u   CREATE SEQUENCE public.box_code_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.box_code_seq;
       public          moovyboxuser    false    207            d           0    0    box_code_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.box_code_seq OWNED BY public.box.code;
          public          moovyboxuser    false    208            �            1259    16428 
   box_id_seq    SEQUENCE     �   ALTER TABLE public.box ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.box_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    207            �            1259    16480 	   inventory    TABLE     S   CREATE TABLE public.inventory (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.inventory;
       public         heap    moovyboxuser    false            �            1259    16478    inventory_id_seq    SEQUENCE     �   ALTER TABLE public.inventory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    212            �            1259    16458    item    TABLE     �   CREATE TABLE public.item (
    id integer NOT NULL,
    name text NOT NULL,
    user_id integer NOT NULL,
    box_id integer NOT NULL
);
    DROP TABLE public.item;
       public         heap    moovyboxuser    false            �            1259    16456    item_id_seq    SEQUENCE     �   ALTER TABLE public.item ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    210            �            1259    16413    move    TABLE     �   CREATE TABLE public.move (
    id integer NOT NULL,
    label text NOT NULL,
    address text,
    user_id integer NOT NULL,
    date timestamp with time zone NOT NULL
);
    DROP TABLE public.move;
       public         heap    moovyboxuser    false            �            1259    16411    move_id_seq    SEQUENCE     �   ALTER TABLE public.move ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.move_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    205            �            1259    49453    task    TABLE     �   CREATE TABLE public.task (
    id integer NOT NULL,
    label text NOT NULL,
    description text,
    nber_days integer DEFAULT 0 NOT NULL,
    general_task boolean DEFAULT false NOT NULL
);
    DROP TABLE public.task;
       public         heap    moovyboxuser    false            �            1259    49451    task_id_seq    SEQUENCE     �   ALTER TABLE public.task ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    214            �            1259    49539 
   tasks_list    TABLE     �   CREATE TABLE public.tasks_list (
    move_id integer NOT NULL,
    task_id integer NOT NULL,
    contact text,
    is_realised boolean DEFAULT false NOT NULL,
    note text,
    date_perso timestamp with time zone DEFAULT CURRENT_DATE
);
    DROP TABLE public.tasks_list;
       public         heap    moovyboxuser    false            �            1259    16397    user    TABLE     h  CREATE TABLE public."user" (
    id integer NOT NULL,
    pseudo text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    confirmed boolean DEFAULT true NOT NULL,
    CONSTRAINT user_email_check CHECK ((email ~* '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'::text)),
    CONSTRAINT user_password_check CHECK ((password ~* '^.{60}$'::text))
);
    DROP TABLE public."user";
       public         heap    moovyboxuser    false            �            1259    16395    user_id_seq    SEQUENCE     �   ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          moovyboxuser    false    203            �
           2604    16455    box code    DEFAULT     �   ALTER TABLE ONLY public.box ALTER COLUMN code SET DEFAULT lpad(to_hex(nextval('public.box_code_seq'::regclass)), 8, '0'::text);
 7   ALTER TABLE public.box ALTER COLUMN code DROP DEFAULT;
       public          moovyboxuser    false    208    207            U          0    16430    box 
   TABLE DATA           i   COPY public.box (id, code, label, destination_room, fragile, heavy, floor, user_id, move_id) FROM stdin;
    public          moovyboxuser    false    207   �<       Z          0    16480 	   inventory 
   TABLE DATA           -   COPY public.inventory (id, name) FROM stdin;
    public          moovyboxuser    false    212   �>       X          0    16458    item 
   TABLE DATA           9   COPY public.item (id, name, user_id, box_id) FROM stdin;
    public          moovyboxuser    false    210   �>       S          0    16413    move 
   TABLE DATA           A   COPY public.move (id, label, address, user_id, date) FROM stdin;
    public          moovyboxuser    false    205   .A       \          0    49453    task 
   TABLE DATA           O   COPY public.task (id, label, description, nber_days, general_task) FROM stdin;
    public          moovyboxuser    false    214   �A       ]          0    49539 
   tasks_list 
   TABLE DATA           ^   COPY public.tasks_list (move_id, task_id, contact, is_realised, note, date_perso) FROM stdin;
    public          moovyboxuser    false    215   �H       Q          0    16397    user 
   TABLE DATA           H   COPY public."user" (id, pseudo, email, password, confirmed) FROM stdin;
    public          moovyboxuser    false    203   ,I       e           0    0    box_code_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.box_code_seq', 99, true);
          public          moovyboxuser    false    208            f           0    0 
   box_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.box_id_seq', 99, true);
          public          moovyboxuser    false    206            g           0    0    inventory_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.inventory_id_seq', 1, false);
          public          moovyboxuser    false    211            h           0    0    item_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.item_id_seq', 220, true);
          public          moovyboxuser    false    209            i           0    0    move_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.move_id_seq', 49, true);
          public          moovyboxuser    false    204            j           0    0    task_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.task_id_seq', 159, true);
          public          moovyboxuser    false    213            k           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 27, true);
          public          moovyboxuser    false    202            �
           2606    16440    box box_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.box DROP CONSTRAINT box_pkey;
       public            moovyboxuser    false    207            �
           2606    16487    inventory inventory_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.inventory DROP CONSTRAINT inventory_pkey;
       public            moovyboxuser    false    212            �
           2606    16465    item item_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            moovyboxuser    false    210            �
           2606    49548 +   tasks_list move_generates_general_task_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.tasks_list
    ADD CONSTRAINT move_generates_general_task_pkey PRIMARY KEY (move_id, task_id);
 U   ALTER TABLE ONLY public.tasks_list DROP CONSTRAINT move_generates_general_task_pkey;
       public            moovyboxuser    false    215    215            �
           2606    16420    move move_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.move
    ADD CONSTRAINT move_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.move DROP CONSTRAINT move_pkey;
       public            moovyboxuser    false    205            �
           2606    16442    box one_box_one_user 
   CONSTRAINT     V   ALTER TABLE ONLY public.box
    ADD CONSTRAINT one_box_one_user UNIQUE (user_id, id);
 >   ALTER TABLE ONLY public.box DROP CONSTRAINT one_box_one_user;
       public            moovyboxuser    false    207    207            �
           2606    16467    item one_item_one_box 
   CONSTRAINT     V   ALTER TABLE ONLY public.item
    ADD CONSTRAINT one_item_one_box UNIQUE (box_id, id);
 ?   ALTER TABLE ONLY public.item DROP CONSTRAINT one_item_one_box;
       public            moovyboxuser    false    210    210            �
           2606    16422    move one_label_one_move 
   CONSTRAINT     \   ALTER TABLE ONLY public.move
    ADD CONSTRAINT one_label_one_move UNIQUE (user_id, label);
 A   ALTER TABLE ONLY public.move DROP CONSTRAINT one_label_one_move;
       public            moovyboxuser    false    205    205            �
           2606    49460    task task_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.task DROP CONSTRAINT task_pkey;
       public            moovyboxuser    false    214            �
           2606    16408    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public            moovyboxuser    false    203            �
           2606    16406    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            moovyboxuser    false    203            �
           2606    16448    box box_move_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_move_id_fkey FOREIGN KEY (move_id) REFERENCES public.move(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.box DROP CONSTRAINT box_move_id_fkey;
       public          moovyboxuser    false    207    205    2746            �
           2606    16443    box box_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.box
    ADD CONSTRAINT box_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.box DROP CONSTRAINT box_user_id_fkey;
       public          moovyboxuser    false    2744    203    207            �
           2606    16473    item item_box_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_box_id_fkey FOREIGN KEY (box_id) REFERENCES public.box(id) ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.item DROP CONSTRAINT item_box_id_fkey;
       public          moovyboxuser    false    2750    210    207            �
           2606    16468    item item_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.item DROP CONSTRAINT item_user_id_fkey;
       public          moovyboxuser    false    203    2744    210            �
           2606    49554 ;   tasks_list move_generates_general_task_general_task_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks_list
    ADD CONSTRAINT move_generates_general_task_general_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.tasks_list DROP CONSTRAINT move_generates_general_task_general_task_id_fkey;
       public          moovyboxuser    false    2760    215    214            �
           2606    49549 3   tasks_list move_generates_general_task_move_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks_list
    ADD CONSTRAINT move_generates_general_task_move_id_fkey FOREIGN KEY (move_id) REFERENCES public.move(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.tasks_list DROP CONSTRAINT move_generates_general_task_move_id_fkey;
       public          moovyboxuser    false    215    2746    205            �
           2606    16423    move move_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.move
    ADD CONSTRAINT move_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.move DROP CONSTRAINT move_user_id_fkey;
       public          moovyboxuser    false    205    2744    203            U   �  x�}S�n�0<?��[n�b`a����*i�z��x�';�Ͷ���7��j�<�Z��5�̛y45��Uu���8�	Գ:���;��C�f�ޕ���"���è�_&V��iX���WG�'����|}E�2>E|X���9�r������3��ܐ�b&�|���I4P�V0T�ۓ�ܣr����3�s�Kx\�o���]��N�\�&��x;��g\�Nѵ+UpT�.�<<���tϖ�Ǻ�oc ��QvFCJ��룧�^0}��;b��>jR�w���N�ȓ�=��������4��1ēN�ISq%wU��]z/W�KQ½����n]�+�<�'���=Q-�z�ّ����~��]���'kH.�8����բ�[�Ŝ�7��	��k���4���01*^!���]�\n�9d?>eY�"_?      Z      x������ � �      X   p  x�uTˎ�0]�_�+Pߏ%		!	Ċ��fz3J���h��a9�;�c8mo�e�s�>>NR�Сq��8�����v�l��CZBUGIQA3�Ҟ�q���t'��r�w�J`D!�v��E�X+����:!:}Fߡ/m|���cF��@h�}�'+�.kE�^K셂
�4J���݉j�6

����Z.H�P�

���MϽ9R��R�k\h���m�i���Z1�;���AJwj��q )=�r��V%���2QP���$Fa�&1�]�
>	��:m`B9�d�G�c���<X��|��$��8�OG-u����B�Ij5��OI��
��V�Ed0�K�� $�G�p�.��[!�r%|��;r���̢<��ޅ��ՖmR܏���2�ɁϮf�m2���_�p�G�Ʉ�5xX�įx��������`��.)+�)�D��2@7TYX��鏍��>�(:����H�^XrhS���r>O'�8�%�p_���/������8�5jWÂ��%�n>���Bkt����ɧvg2چ���I)�ͽX��9dl�N��t!��5��;X����������q%y���|.�i^���~.�-˿Ͷ�P��o��ɲ-����(�~Nks�      S   �   x����
�0F盧�.�$��m� ]R{�`�J�>R&"/f:
��x����M𝼣�n�-�z�J5:���;z�8Z� �OX�0Ny^m����i^��:x����w�CQ�(v}�O�fG+����-�D�H���>~�&�*��.�Ad�X	�s�bC/kB��p      \   �  x��XMo[E]���ɪ 9Q��i�
�$h���?��Iߛy�����nY�a�P]$V,����'��8g��q>*�>j���3��{���8�>:iJ%��T�5�X<�s傘)QZ��A�(\�����ػ�����˟�«
���'F4*� ��T��F'*)�J��UP|j�z!�_E0䕃/J�5�.�vj�?��s 9S�2���9������顅=<�<W�`��^�*=�lTnW|�p��)g4Δ�DE�M5@�S���q�EP���H'�'�q�+/Z��b�-�nidF93�T2d�9��.u�v'f���k1�8�"�(F�c��
~ jy&�6�y��s]��-I{�|������Ö� �����퉙�G	��!�	UOeU5��n����bb��`s��y1w�L��Z�qI@_A��j��Á@@ɭ�'b#3rِ�i�*������~���<��s1s��)䩰�ϵ~�1<�ִ��>_u�l5! T[e"��J��53��,ʊ,�йB � � 䒙��6�*��.�>�'_���x�f�|@*�y��� <J �	̅��/�����a����O% ���M�[�+,���������uHN`U����А{�:�+��F���Qlz�T�(+�@WQ�7�=�qT<�A׉iح"��˗���/[4�J�E�r�5�J*E�V�:c����nP�:��5��nT$/sӈ&�ܱfq�Jڔ�_Vbģ^JM���k՛$v�
�xbN���B����	�xE�)u#���C����0r����&�<�s���"�A�a�,����cyº	�]�zU��a�_HmԆ��?�v���+���P��_�����t`4d;�R�X�Tf��p�D��D=�bg��3���M���<,�.-�oX8؁�����z��d���x �:������c^/F����0L:{E�ʔ
{��b�upp���W���Rg��Aꙵթ���R^@��&�ÃE�8_���ߋ01|{����X\,��E�(��������k���nt�J
�h*��gGE-s����7�����8>�",����oxh�AHI���f�����a�cKC��Zݭw+��J���h	[��K�<KΘ'(��cP1�M�x�'��e����.��tCr	ȪLO6h��H4�7�:q���x���g����'���~�Y�*mݠ���wY�k������$>�2�95�$_+��;,�Ė�s��C"�9{�0��������V�c��S!.0�<��\by-���ǈ��z�f�Ps9���6����y৩��j;˴3����4�/'i���3��[|����6�� ������o�g�H�J���ݤh��Y�zKn)Sl�q�H]K!��`V�5��@��E�I�m����RT��Qr�kҊ��([�-�*}���y���IX5e�v�L^������}/�\�)}j�͔�R���2���N����b�>Sj�G7�P�dX��tf���u�7i��d	t�k$�%��3��c+���V>�+�__Ef��Y��Ǚq�F����ؒ?�-u�
Ӌ�ɰر�d�,u��J]�@�m#�bA�S���n89��_9I�e�'3�]��S�F�*��$�{��c�rkF�0���ݔ���S��8&�[[[����      ]   �   x���1
�0�Y>��� ɑS�=A�Ҏ	-�}��c��}�H� #ӈ�ģ&Ƅˤ2 9:�^�f>����x���ܬB�l%��VS׳��IJm�
��2④����s����� �@�a�-Z'���{N5      Q   �  x�m�˒�0�5>GoE���o8�7�k6� � D���gj�g�UΩ:��g:�Q��%�j�j���Ű�͹���&L�
=�GF�N�*5�Ow�@�աP�*�4�Y�����x��mz�o�5W� ��fx�H���q��D��>��tu�� �J�X>��7�� ]�L�-
�^I`��]�[����_��+�6�
����],x<�ˮ�}[𾸰Ko+�G ��P��F9�?��l#���3��b�䫫VϝeE�q��\�
�Вvj
֬P���ٺ'<0ҫ*�2 <���� k��D]��%f�"�Kխ�iė�E��b����Y~U�9tŤq�{��;2���O<��7=
$�R�����R�Ӌ�\{��^���b;��4HА8�0�P�7|x���y�ah|w:��*�ċ�ޙ{�`�cy����G5�]g��!�]�f�B�����G��'+�;     