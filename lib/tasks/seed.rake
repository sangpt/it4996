require "ffaker"

namespace :db do
  desc "Fake data"
  task seed: :environment do
    puts "================== START =================="

    puts "Generating server..."
    10.times do
      Server.create server: FFaker::Internet.ip_v4_address,
        database: FFaker::Internet.domain_word,
        username: FFaker::Internet.user_name,
        password: FFaker::Internet.password
    end

    puts "Generating service and subservice..."
    10.times do
      service = Service.create type: rand(3),
        name: FFaker::Company.name
      5.times do |i|
        service.subservices.create name: "Subservice#{i}"
      end
    end

    puts "Generating client..."
    all_services = Service.all
    10.times do
      Client.create username: FFaker::Internet.user_name,
        email: FFaker::Internet.email,
        password: FFaker::Internet.password,
        services: all_services.shuffle.first(rand(1..5))
    end
    Client.create username: 'Sang Pham',
      email: 'client@gmail.com',
      password: '123123',
      services: all_services.shuffle.first(rand(1..5))

    puts "Generating request..."
    all_clients = Client.all
    Subservice.all.each do |subservice|
      200.times do |i|
        subservice.requests.create content: FFaker::Lorem.paragraph,
        start_time: i.hours.ago,
        end_time: (i-6).hours.ago,
        input_type: ["voice", "text"].sample,
        output_type: ["voice", "text"].sample,
        status: ["success", "error"].sample,
        token_number: rand(500),
        tts_engine_ip: FFaker::Internet.ip_v4_address,
        device_id: FFaker::Internet.ip_v4_address,
        client: all_clients.sample
      end
    end

    puts "Generating server_request..."
    all_servers = Server.all
    Request.all.each do |request|
      3.times do |i|
        request.requests.create server: all_servers.sample,
          action: "Action#{i}"
      end
    end

    puts "Generating admin..."
    Admin.create email: 'admin@gmail.com', password: '123123',
      name: 'Admin'

    puts "================== END =================="
  end

  desc "Create duration for Request"
  task duration: :environment do
    puts "================== START =================="

    Request.all.each do |request|
      request.update_attributes duration: request.end_time.to_i - request.start_time.to_i
    end

    puts "================== END =================="
  end
end
