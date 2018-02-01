class PasswordEncrypt::AES256
  ENCRYPT_TYPE = "AES256"

  class << self
    def encode string, server = nil
      cipher = OpenSSL::Cipher.new ENCRYPT_TYPE
      cipher.encrypt
      key = cipher.random_key
      iv = cipher.random_iv
      store_key key, iv, server
      cipher.update(string) + cipher.final
    end

    def decode string, server = nil
      key, iv = get_key server
      decipher = OpenSSL::Cipher.new ENCRYPT_TYPE
      decipher.decrypt
      decipher.key = key
      decipher.iv = iv
      decipher.update(string) + decipher.final
    rescue TypeError, OpenSSL::Cipher::CipherError => e
      Rails.logger.debug e.inspect
      false
    end

    private
    def store_key key, iv, server
      File.open(aes_key(server), "wb") do |file|
        file.print key
      end
      File.open(aes_iv(server), "wb") do |file|
        file.print iv
      end
    end

    def get_key server
      key_path = aes_key(server)
      iv_path = aes_iv(server)
      return unless File.exist?(key_path) || File.exist?(iv_path)
      [File.read(key_path), File.read(iv_path)]
    end

    def aes_key server
      File.join Settings.file_location.root_dir, "aes_key_#{server}.aes"
    end
    def aes_iv server
      File.join Settings.file_location.root_dir, "aes_iv_#{server}.aes"
    end
  end
end
