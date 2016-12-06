SSHKIT.config.command_map[:nvm] = "#{ENV['NVM_DIR']}/nvm-exec"

namespace :webpack do
  task :precompile do
    on roles(:web) do
      execute fetch(:nvm), 'yarn run compile'
    end
  end
end