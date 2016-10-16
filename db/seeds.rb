# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


CostCategory.create([
                        {id: 1, cost: 3000},
                        {id: 2, cost: 4000}
                    ])
# Types of estate
  EstateType.create([
                        {id: 1, title: 'Комната', cost_category_id: 1},
                        {id: 2, title: 'Коммуналка', cost_category_id: 1},
                        {id: 3, title: 'Общежитие', cost_category_id: 1},
                        {id: 4, title: 'Малосемейка', cost_category_id: 1},
                        {id: 5, title: '1 комн.', cost_category_id: 2},
                        {id: 6, title: '2 комн.', cost_category_id: 2},
                        {id: 7, title: '3 комн.', cost_category_id: 2},
                        {id: 8, title: '4 комн', cost_category_id: 2},
                        {id: 9, title: '>4 комн. ', cost_category_id: 2},
                        {id: 10, title: 'Частный дом', cost_category_id: 2},
                        {id: 11, title: 'Котедж', cost_category_id: 2},
                        {id: 12, title: 'Флигель', cost_category_id: 2}
                    ])

  CityArea.create([
                      {id: 1, title: 'Д-П'},
                      {id: 2, title: 'Д-В'},
                      {id: 3, title: 'Горроща'},
                      {id: 4, title: 'Центр'},
                      {id: 5, title: 'Приокский'},
                      {id: 6, title: 'Шлаковый'},
                      {id: 7, title: 'Канищево'},
                      {id: 9, title: 'Южный'},
                      {id: 10, title: 'Недостоево'},
                      {id: 11, title: 'Кальное'},
                      {id: 12, title: 'Ворошиловка'},
                      {id: 13, title: 'Московский'},
                      {id: 14, title: 'Дягилево'},
                  ])

# Estates
  Estate.create([
                    {id: 1,
                     owner_name: 'Иван Васильевич',
                     owner_phone: '+74912111111',
                     description: 'м-н "Алфавит", 1|2 эт., кирп., 35,7|19,2|5,6 кв. м, отдельный вход, с/у совмещенный, новая с/т, потолки 2,8 м, подпол под комнатой, светлая, теплая, сухая, тихий двор',
                     estate_type_id: 1,
                     address: 'Краснорядская, 32',
                     status: 1,
                     city_area_id: 1,
                     is_deleted: 0,
                     cost: 3000
                    },
                    {id: 2,
                     owner_name: 'Анна Иоановна',
                     owner_phone: '+74912222222',
                     description: 'Очень хороший, теплый и уютный дом, боьшой двор, добрая собака',
                     estate_type_id: 8,
                     footage: 120,
                     address: 'п. Солотча',
                     status: 1,
                     city_area_id: 2,
                     is_deleted: 0,
                     cost: 1000
                    },
                    {id: 3,
                     owner_name: 'Пётр',
                     owner_phone: '+74912333333',
                     description: 'Квартира с видом на кремль. Окна во двор ',
                     estate_type_id: 4,
                     footage: 40,
                     address: 'ул. Ленина, д.15, кв 78',
                     status: 1,
                     city_area_id: 4,
                     is_deleted: 0,
                     cost: 3000
                    },
                    {id: 4,
                     owner_name: 'Иван',
                     owner_phone: '+74912444444',
                     description: 'Коттедж, епта. Со всеми наворотами. Все по феншую ребята забабахали',
                     estate_type_id: 9,
                     footage: 200,
                     address: 'Снегири',
                     status: 2,
                     city_area_id: 3,
                     is_deleted: 0,
                     cost: 3000
                    },
                    {id: 5,
                     owner_name: 'Владимир Красно Солнышко',
                     owner_phone: '+74912555555',
                     description: 'Квартира на улице Дзержинского, д. 25, кв. 89',
                     estate_type_id: 3,
                     footage: 40,
                     address: 'Дзержинского, д. 25, кв. 89',
                     status: 3,
                     city_area_id: 1,
                     is_deleted: 0,
                     cost: 3000
                    }
                ])

#Users
  User.create([{
                   id: 1,
                   first_name: 'Аркадий',
                   last_name: 'Сиволап',
                   patronym: 'Романович',
                   phone_number: '+79201233178',
                   is_deleted: 0
               },
               {
                   id: 2,
                   first_name: 'Никита',
                   last_name: 'Жлоба-Погорельс',
                   patronym: 'Фёдорович',
                   phone_number: '+79201233178',
                   is_deleted: 0
               },
               {
                   id: 3,
                   first_name: 'Лев',
                   last_name: 'Лихопой',
                   patronym: 'Вячеславович',
                   phone_number: '+79201233178',
                   is_deleted: 0
               },
               {
                   id: 4,
                   first_name: 'Пётр',
                   last_name: 'Горбатый',
                   patronym: 'Вячеславович',
                   phone_number: '+79201233178',
                   is_deleted: 0
               },
               {
                   id: 5,
                   first_name: 'Павел',
                   last_name: 'Скоропостижный',
                   patronym: 'Матвеевич',
                   phone_number: '+79201233178',
                   is_deleted: 0
               }
              ])

#Release seed!
# User.create({
#                    id: 1,
#                    first_name: 'Артём',
#                    last_name: '',
#                    patronym: '',
#                    is_deleted: 0
#                })
# Account.create(
#     {
#         id: 1,
#         login: 'director',
#         password: 'fkmrjh62ha',
#         account_type: 3,
#         user_id: 1,
#         email: 'mister.Artemka1990@yandex.ru'
#     })
# Account.create(
#                    {
#                        id: 2,
#                        login: 'mister.Artemka',
#                        password: 'fkmrjh62ha',
#                        account_type: 1,
#                        user_id: 1,
#                        email: 'mister.Artemka1990@yandex.ru',
#                        creator_id: 1
#                    })
#Accounts
  Account.create([
                     {
                         id: 1,
                         login: 'manager1',
                         password: 'pass',
                         account_type: 1,
                         user_id: 1
                     },
                     {
                         id: 2,
                         login: 'manager2',
                         password: 'pass',
                         account_type: 1,
                         user_id: 2
                     },
                     {
                         id: 3,
                         login: 'user1',
                         password: 'pass',
                         account_type: 2,
                         user_id: 3,
                         start_date: '2015-05-16 14:06:00',
                         end_date: '2015-06-16 15:06:00',
                     },
                     {
                         id: 4,
                         login: 'user2',
                         password: 'pass',
                         account_type: 2,
                         user_id: 4,
                         start_date: '2015-05-16 14:06:00',
                         end_date: '2015-05-29 10:00:00',
                     },
                     {
                         id: 5,
                         login: 'user3',
                         password: 'pass',
                         account_type: 2,
                         user_id: 5,
                         start_date: '2015-05-16 14:06:00',
                         end_date: '2015-09-01 00:01:00',
                     },
                     {
                         id: 6,
                         login: 'user4',
                         password: 'pass',
                         account_type: 2,
                         user_id: 5,
                         start_date: '2015-05-16 14:06:00',
                         end_date: '2015-06-01 12:00:00',
                     },
                     {
                         id: 7,
                         login: 'director',
                         password: 'pass',
                         account_type: 3,
                         email: 'egorogor@mail.ru',
                         user_id: 1
                     },
                 ])

# available for user types of estate
  AccountEstateType.create([
                               {
                                   id: 1,
                                   account_id: 3,
                                   estate_type_id: 1
                               },
                               {
                                   id: 2,
                                   account_id: 3,
                                   estate_type_id: 2
                               },
                               {
                                   id: 3,
                                   account_id: 3,
                                   estate_type_id: 3
                               },
                               {
                                   id: 4,
                                   account_id: 3,
                                   estate_type_id: 4
                               },
                               {
                                   id: 5,
                                   account_id: 4,
                                   estate_type_id: 1
                               },
                               {
                                   id: 6,
                                   account_id: 4,
                                   estate_type_id: 2
                               },
                               {
                                   id: 7,
                                   account_id: 4,
                                   estate_type_id: 10
                               },
                               {
                                   id: 8,
                                   account_id: 5,
                                   estate_type_id: 6
                               },
                               {
                                   id: 9,
                                   account_id: 5,
                                   estate_type_id: 8
                               },
                               {
                                   id: 10,
                                   account_id: 6,
                                   estate_type_id: 4
                               },
                               {
                                   id: 11,
                                   account_id: 6,
                                   estate_type_id: 5
                               }
                           ])
